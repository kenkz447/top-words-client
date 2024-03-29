import { events } from 'qoobee';
import * as React from 'react';

import { BaseComponent, playAudio } from '@/domain';
import { splitsentences, wait } from '@/utilities';

export interface ArticleLearningBaseProps {
    readonly content: string | string[];
    readonly contentTranslated?: string | string[];
    readonly onCompleted: () => void;
    readonly onStop: () => void;
    readonly showHintOnSubmit?: boolean;
}

export interface ArticleLearningBaseState {
    readonly inputState: 'default' | 'error' | 'success';
    readonly contents: string[];
    readonly currentContentIndex: number;
    readonly currentInputValue: string;
    readonly isReadonly: boolean;
    readonly hint?: string;
    readonly processPercent: number;
}

export class ArticleLearningBase<P> extends BaseComponent<
    P & ArticleLearningBaseProps,
    ArticleLearningBaseState
    > {

    private get currentTextContent() {
        const { contents, currentContentIndex } = this.state;
        const currentTextContent = contents[currentContentIndex];

        return currentTextContent;
    }

    private get hasMoreContent() {
        const { contents, currentContentIndex } = this.state;

        return currentContentIndex < contents.length;
    }

    private _isDone = false;

    public readonly extraChars = [' ', '.', '\'', ',', '"', '?', '!'];

    public readonly initSeechRate = .85;
    public readonly maxSeechRate = 1;
    public readonly minSeechRate = .7;
    public readonly speechRateStep = 0.15;

    public _isSpeeching = false;
    public _speechRate = 1;

    constructor(props: P & ArticleLearningBaseProps) {
        super(props);

        const articleContent = Array.isArray(props.content)
            ? props.content
            : splitsentences(props.content);

        this.state = {
            inputState: 'default',
            contents: articleContent
                .filter(o => !!o)
                // Replace char code 160 with 32 (space char)
                .map(o => o.replace(/\s+/g, ' ')),

            currentContentIndex: 0,
            isReadonly: false,
            currentInputValue: '',
            processPercent: 0
        };

        events.addListener('ARTICLE_LEARNING_PLAY_TEXT', () => this.desertSpeechRate());
        events.addListener('ARTICLE_LEARNING_COMPLETED_WORD', () => this.insertSpeechRate());
        events.addListener('ARTICLE_LEARNING_COMPLETED_CONTENT', () => this.resetSpeechRate());
    }

    private readonly resetSpeechRate = () => {
        this._speechRate = this.initSeechRate;
    }

    private readonly insertSpeechRate = () => {
        if (this._speechRate >= this.maxSeechRate) {
            return;
        }

        this._speechRate += this.speechRateStep;
    }

    private readonly desertSpeechRate = () => {
        if (this._speechRate <= this.minSeechRate) {
            return;
        }

        this._speechRate -= this.speechRateStep;
    }

    private readonly goToNextContent = async () => {
        const { onCompleted } = this.props;
        const { currentContentIndex, contents } = this.state;

        const nextContentIndex = currentContentIndex + 1;

        this.setState({
            isReadonly: true,
            inputState: 'success',
            processPercent: nextContentIndex / contents.length * 100
        });

        await wait(1000);

        if (this.hasMoreContent) {
            this.setState({
                isReadonly: false,
                currentContentIndex: nextContentIndex,
                currentInputValue: '',
                inputState: 'default'
            });

            return;
        }

        this._isDone = true;
        onCompleted();
    }

    private readonly start = () => {
        this.tryAddExtraCharToInput();
        this.playTextContent();
    }

    private readonly playTextContent = async () => {
        if (this._isSpeeching || !this.currentTextContent) {
            return;
        }

        const currentInputProcess = this.getCurrentProcessIndex();
        const allProcess = this.currentTextContent.split(' ');
        const texts: string[] = [];

        for (let index = currentInputProcess - 1; index < allProcess.length; index++) {
            texts.push(allProcess[index]);
        }

        const contentToPlay = texts.join(' ');

        this._isSpeeching = true;
        await playAudio(contentToPlay, this._speechRate);
        this._isSpeeching = false;

        events.emit('ARTICLE_LEARNING_PLAY_TEXT', { content: contentToPlay });
    }

    private readonly tryAddExtraCharToInput = () => {
        const { currentInputValue } = this.state;

        if (!this.currentTextContent) {
            return;
        }

        const nextInputCharPosition = currentInputValue.length;

        const nextCorrectChar = this.currentTextContent.charAt(nextInputCharPosition);

        const nextCharIsExtra = this.extraChars.includes(nextCorrectChar);

        if (!nextCharIsExtra) {
            return;
        }

        this.setState({
            currentInputValue: currentInputValue + nextCorrectChar
        });

        if (nextCorrectChar === ' ') {
            events.emit('ARTICLE_LEARNING_COMPLETED_WORD');
        }
    }

    private readonly tryGoToNextContent = () => {
        const { currentInputValue } = this.state;

        const isCompletedCurrentContent = currentInputValue === this.currentTextContent;

        if (!isCompletedCurrentContent) {
            return;
        }

        events.emit('ARTICLE_LEARNING_COMPLETED_CONTENT');
        this.goToNextContent();
    }

    private readonly showHint = () => {
        if (!this.currentTextContent) {
            return;
        }

        const currentInputProcess = this.getCurrentProcessIndex();
        const allProcess = this.currentTextContent.split(' ');

        const word = allProcess[currentInputProcess];

        const hint = this.extraChars.reduce((prevValue, extraChar) => prevValue.replace(extraChar, ''), word);

        this.setState({
            hint: hint,
            inputState: 'error'
        });
    }

    public readonly onInputKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {

        const isEnter = e.keyCode === 13;
        const isDot = e.keyCode === 190;

        if (isDot) {
            const toToNextWordBtn = document.getElementById('goToNextWordBtn');
            if (toToNextWordBtn) {
                this.onGotoNextWordClick();
            }
        }

        if (isEnter) {
            await this.playTextContent();
        }
    }

    public readonly onInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const backspaceKeyCode = 8;
        if (e.keyCode === backspaceKeyCode) {
            e.preventDefault();

            return;
        }
    }

    public readonly onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { isReadonly, currentInputValue } = this.state;
        const { value: nextInputValue } = e.target;

        if (isReadonly) {
            return;
        }

        const newTextPositionStart = currentInputValue.length ? currentInputValue.length : 0;
        const newTextPositionEnd = nextInputValue.length;

        const correctText = this.currentTextContent.substring(newTextPositionStart, newTextPositionEnd);
        const inputedText = nextInputValue.substring(newTextPositionStart, newTextPositionEnd);

        if (correctText.toLowerCase() === inputedText.toLowerCase()) {
            const nextCurrentInputValue = currentInputValue + correctText;

            this.setState({
                currentInputValue: nextCurrentInputValue,
                inputState: 'default',
                hint: ''
            });
        }
    }

    public readonly onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const { showHintOnSubmit } = this.props;

        e.preventDefault();

        if (showHintOnSubmit) {
            this.showHint();
        } else {
            this.setState({
                inputState: 'error'
            });
        }
    }

    public readonly focusInput = () => {
        const inputElement = document.getElementById('learnningInput');

        if (!inputElement) {
            return;
        }

        inputElement.focus();
    }

    public readonly getCurrentProcessIndex = () => {
        const { currentInputValue } = this.state;

        const currentInputProcess = currentInputValue.split(' ');

        return currentInputProcess.length - 1;
    }

    public readonly onGotoNextWordClick = () => {
        this.showHint();
        this.focusInput();
    }

    public componentDidUpdate(prevProps: ArticleLearningBaseProps, prevState: ArticleLearningBaseState) {
        if (this._isDone) {
            return;
        }

        if (this.state.currentContentIndex !== prevState.currentContentIndex) {
            this.playTextContent();
        }

        this.tryAddExtraCharToInput();
        this.tryGoToNextContent();
    }

    public componentWillMount() {
        this.start();
    }
}
