import * as React from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label
} from 'reactstrap';
import styled from 'styled-components';

import { playAudio } from '@/domain';
import { text } from '@/i18n';
import { wait } from '@/utilities';

const ArticleLearningWrapper = styled.div`
    margin-bottom: 24px;
    #goToNextWordBtn {
        padding: 0;
        font-size: 21px;
        width: 50px;
    }
`;

interface ArticleLearningProps {
    readonly content: string | string[];
    readonly onCompleted: () => void;
}

interface ArticleLearningState {
    readonly inputState: 'default' | 'error' | 'success';
    readonly contents: string[];
    readonly currentContentIndex: number;
    readonly currentInputValue: string;
    readonly isReadonly: boolean;
    readonly hint?: string;
}

export class ArticleLearning extends React.PureComponent<ArticleLearningProps, ArticleLearningState> {
    private readonly extraChars = [' ', ',', '"', '?', '!'];

    private _isSpeeching = false;
    get currentTextContent() {
        const { contents, currentContentIndex } = this.state;
        const currentTextContent = contents[currentContentIndex];

        return currentTextContent;
    }

    constructor(props: ArticleLearningProps) {
        super(props);

        const articleContent = Array.isArray(props.content)
            ? props.content
            : props.content.split('.').map(content => content.trim());

        this.state = {
            inputState: 'default',
            contents: articleContent
                .filter(o => !!o)
                // Replace char code 160 with 32 (space char)
                .map(o => o.replace(/\s+/g, ' ')),
            
            currentContentIndex: 0,
            isReadonly: false,
            currentInputValue: ''
        };
    }

    private readonly goToNextContent = async () => {
        const { onCompleted } = this.props;
        const { currentContentIndex, contents } = this.state;

        if (currentContentIndex === contents.length - 1) {
            return onCompleted();
        }

        this.setState({
            isReadonly: true,
            inputState: 'success'
        });

        await wait(1000);

        this.setState({
            isReadonly: false,
            currentContentIndex: currentContentIndex + 1,
            currentInputValue: '',
            inputState: 'default'
        });
    }

    private readonly start = () => {
        this.playTextContent();
    }

    private readonly playTextContent = async () => {
        if (this._isSpeeching) {
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
        await playAudio(contentToPlay);
        this._isSpeeching = false;
    }

    private readonly onInputKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const enterKeyCode = 13;
        const isEnter = e.keyCode === enterKeyCode;

        if (e.shiftKey && isEnter) {
            const toToNextWordBtn = document.getElementById('goToNextWordBtn');
            if (toToNextWordBtn) {
                toToNextWordBtn.click();
            }
        }

        if (isEnter) {
            return await this.playTextContent();
        }
    }

    private readonly onInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const backspaceKeyCode = 8;
        if (e.keyCode === backspaceKeyCode) {
            e.preventDefault();

            return;
        }
    }

    private readonly onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    private readonly onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        this.setState({
            inputState: 'error'
        });
    }

    private readonly tryAddExtraCharToInput = () => {
        const { currentInputValue } = this.state;

        const nextInputCharPosition = currentInputValue.length;
        const nextCorrectChar = this.currentTextContent.charAt(nextInputCharPosition);

        const nextCharIsExtra = this.extraChars.includes(nextCorrectChar);

        if (!nextCharIsExtra) {
            return;
        }

        this.setState({
            currentInputValue: currentInputValue + nextCorrectChar
        });
    }

    private readonly tryGoToNextContent = () => {
        const { currentInputValue } = this.state;

        const isCompletedCurrentContent = currentInputValue === this.currentTextContent;

        if (!isCompletedCurrentContent) {
            return;
        }

        this.goToNextContent();
    }

    private readonly focusInput = () => {
        const inputElement = document.getElementById('learnningInput');

        if (!inputElement) {
            return;
        }

        inputElement.focus();
    }

    private readonly getCurrentProcessIndex = () => {
        const { currentInputValue } = this.state;

        const currentInputProcess = currentInputValue.split(' ');

        return currentInputProcess.length - 1;
    }

    private readonly onGotoNextWordClick = () => {
        const currentInputProcess = this.getCurrentProcessIndex();
        const allProcess = this.currentTextContent.split(' ');

        const word = allProcess[currentInputProcess];

        const hint = this.extraChars.reduce((prevValue, extraChar) => prevValue.replace(extraChar, ''), word);

        this.setState({
            hint: hint,
            inputState: 'error'
        });

        this.focusInput();
    }

    public componentDidUpdate(prevProps: ArticleLearningProps, prevState: ArticleLearningState) {
        if (this.state.currentContentIndex !== prevState.currentContentIndex) {
            this.playTextContent();
        }

        this.tryAddExtraCharToInput();
        this.tryGoToNextContent();
    }

    public componentWillMount() {
        this.start();
    }

    public render() {
        const { inputState, currentInputValue, hint } = this.state;

        return (
            <ArticleLearningWrapper className="container-small">
                <Form onSubmit={this.onSubmit}>
                    <Label for="learnningInput">
                        {
                            hint
                                ? <span className="text-danger"> ... {hint}</span>
                                : text('Hold SHIFT and press ENTER to use cheat!')
                        }
                    </Label>
                    <InputGroup>
                        <Input
                            id="learnningInput"
                            placeholder={text('Input your answer...')}
                            autoFocus={true}
                            invalid={inputState === 'error'}
                            valid={inputState === 'success'}
                            onKeyUp={this.onInputKeyUp}
                            onKeyDown={this.onInputKeyDown}
                            value={currentInputValue}
                            onChange={this.onInputChange}
                        />
                        <InputGroupAddon addonType="append">
                            <Button
                                id="goToNextWordBtn"
                                color="danger"
                                onClick={this.onGotoNextWordClick}
                            >
                                <i className="nc-icon nc-user-run" />
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    <input className="display-none" type="submit" />
                </Form>
            </ArticleLearningWrapper>
        );
    }
}
