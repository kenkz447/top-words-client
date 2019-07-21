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
import { Article } from '@/restful';
import { wait } from '@/utilities';

const ArticleLearningWrapper = styled.div`
    margin-bottom: 24px;
    #goToNextWord {
        padding: 0;
        font-size: 21px;
        width: 50px;
    }
`;

interface ArticleLearningProps {
    readonly article: Article;
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
    private readonly extraChars = [' ', ','];

    private _isSpeeching = false;
    get currentTextContent() {
        const { contents, currentContentIndex } = this.state;
        const currentTextContent = contents[currentContentIndex];

        return currentTextContent;
    }

    constructor(props: ArticleLearningProps) {
        super(props);

        const articleContent = props.article.content_EN;
        this.state = {
            inputState: 'default',
            contents: articleContent.split('.').map(content => content.trim()),
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

        const contentToPlay = this.currentTextContent;

        this._isSpeeching = true;

        await playAudio(contentToPlay);

        this._isSpeeching = false;
    }

    private readonly onInputKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const enterKeyCode = 13;
        if (e.keyCode === enterKeyCode) {
            await this.playTextContent();
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

        const newCharPosition = nextInputValue.length - 1;

        const correctChar = this.currentTextContent[newCharPosition];
        const inputedChar = nextInputValue[newCharPosition];

        if (correctChar.toLowerCase() === inputedChar.toLowerCase()) {
            const nextCurrentInputValue = currentInputValue + correctChar;

            this.setState({
                currentInputValue: nextCurrentInputValue,
                hint: ''
            });
        }
    }

    private readonly onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({
            inputState: 'error'
        });

        setTimeout(
            () => {
                this.setState({
                    inputState: 'default'
                });
            },
            50
        );
    }

    private readonly tryAddExtraCharToInput = () => {
        const { currentInputValue } = this.state;

        const nextInputCharPosition = currentInputValue.length;
        const nextCorrectChar = this.currentTextContent[nextInputCharPosition];

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

    private readonly onGotoNextWordClick = () => {
        const { currentInputValue } = this.state;

        const currentInputProcess = currentInputValue.split(' ');
        const currentContentProcess = this.currentTextContent.split(' ');

        const word = currentContentProcess[currentInputProcess.length - 1];

        const hint = this.extraChars.reduce((prevValue, extraChar) => prevValue.replace(extraChar, ''), word);

        this.setState({
            hint: hint
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
                    <FormGroup label={hint}>
                        <Label for="learnningInput">{hint}</Label>
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
                                    id="goToNextWord"
                                    color="info"
                                    onClick={this.onGotoNextWordClick}
                                >
                                    <i className="nc-icon nc-user-run" />
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <input className="display-none" type="submit" />
                </Form>
            </ArticleLearningWrapper>
        );
    }
}
