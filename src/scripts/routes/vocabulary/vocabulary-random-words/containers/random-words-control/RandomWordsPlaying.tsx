import * as React from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    Progress
} from 'reactstrap';
import styled from 'styled-components';

import { Loading } from '@/components';
import { playAudio } from '@/domain';
import { text } from '@/i18n';
import { Vocabulary } from '@/restful';

const RandomWordsPlayingWrapper = styled.div`
    display:block;
`;

interface RandomWordsPlayingProps {
    readonly onBack: () => void;
    readonly onComplete: (correctedWords: Vocabulary[], incorrectWords: Vocabulary[]) => void;
    readonly vocabularies: Vocabulary[];
}

interface RandomWordsPlayingState {
    readonly seconLeft: number;
    readonly currentInputValue: string;
    readonly vocabularies: Vocabulary[];
    readonly currentWord: Vocabulary;
    readonly currentWordIndex: number;
    readonly addSecond: number;
    readonly correctedWords: Vocabulary[];
    readonly incorrectedWords: Vocabulary[];
}

export class RandomWordsPlaying extends React.PureComponent<
    RandomWordsPlayingProps,
    RandomWordsPlayingState
    > {

    private _countdownInterval: number;
    private _isSpeeching: boolean;

    constructor(props: RandomWordsPlayingProps) {
        super(props);

        this.state = {
            seconLeft: 60,
            currentInputValue: '',
            vocabularies: props.vocabularies,
            currentWord: props.vocabularies[0],
            currentWordIndex: 0,
            addSecond: 0,
            correctedWords: [],
            incorrectedWords: []
        };
    }

    private readonly playTextContent = async (textContent: string) => {
        if (this._isSpeeching) {
            return;
        }

        this._isSpeeching = true;
        await playAudio(textContent, .8);
        this._isSpeeching = false;
    }

    private readonly focusInput = () => {
        const inputElement = document.getElementById('vocabularyRandomWordsInput');

        if (!inputElement) {
            return;
        }

        inputElement.focus();
    }

    private readonly onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const { vocabularies, currentWordIndex, incorrectedWords, currentWord, addSecond } = this.state;

        if (!currentWord) {
            return;
        }

        const nextProjectIndex = currentWordIndex + 1;

        this.setState(
            {
                currentWordIndex: nextProjectIndex,
                currentWord: vocabularies[nextProjectIndex],
                currentInputValue: '',
                addSecond: addSecond + -3,
                incorrectedWords: [
                    ...incorrectedWords,
                    currentWord
                ]
            });
    }

    private readonly onInputChange = (e) => {
        const nextInputValue = e.target.value as string;

        const { currentWord } = this.state;
        if (!currentWord) {
            return;
        }

        const isMatching = currentWord.name.toLowerCase() === nextInputValue.toLowerCase();

        if (!isMatching) {

            this.setState({
                currentInputValue: nextInputValue
            });

            return;
        }

        this.toNextWord();
    }

    private readonly toNextWord = () => {
        const { currentWord, vocabularies, currentWordIndex, correctedWords } = this.state;
        if (!currentWord) {
            return;
        }

        const nextWordIndex = currentWordIndex + 1;

        if (nextWordIndex === vocabularies.length) {
            this.setState({
                currentWordIndex: nextWordIndex,
                currentInputValue: '',
                correctedWords: [
                    ...correctedWords,
                    currentWord
                ]
            });

            return;
        }

        const nextVocabulary = vocabularies[nextWordIndex];
        const addSecond = currentWord.name.length;

        this.setState({
            currentWordIndex: nextWordIndex,
            currentWord: nextVocabulary,
            currentInputValue: '',
            addSecond: addSecond,
            correctedWords: [
                ...correctedWords,
                currentWord
            ]
        });
    }

    private readonly testComplete = () => {
        const { onComplete } = this.props;
        const { correctedWords, incorrectedWords } = this.state;

        onComplete(correctedWords, incorrectedWords);
        clearInterval(this._countdownInterval);
    }

    private readonly startCountdown = () => {
        this._countdownInterval = setInterval(
            () => {
                const { seconLeft, addSecond } = this.state;
                const nextSeconLeft = seconLeft + addSecond;

                if (nextSeconLeft >= 0) {
                    this.setState({
                        seconLeft: nextSeconLeft,
                        addSecond: -1
                    });

                    return;
                }

                this.testComplete();
            },
            1000
        );
    }

    private readonly getWordHint = () => {
        const { currentWord } = this.state;
        if (!currentWord) {
            return '...';
        }

        return `${currentWord.name[0]}...${currentWord.name[currentWord.name.length - 1]}`;
    }

    private readonly getProcessPercent = () => {
        const { seconLeft } = this.state;

        if (seconLeft >= 60) {
            return 100;
        }

        return seconLeft / 60 * 100;
    }

    public componentDidUpdate(prevProps: RandomWordsPlayingProps, prevState: RandomWordsPlayingState) {
        const { currentWord, currentWordIndex, vocabularies } = this.state;

        if (currentWordIndex > vocabularies.length) {
            this.testComplete();

            return;
        }

        if (currentWord && (currentWord !== prevState.currentWord)) {
            this.focusInput();
            this.playTextContent(currentWord.name);
        }
    }

    public componentDidMount() {
        const { currentWord } = this.state;
        this.playTextContent(currentWord.name);
        this.startCountdown();
    }

    public render() {
        const { onBack } = this.props;
        const { currentInputValue, currentWord } = this.state;

        if (!currentWord) {
            return <Loading />;
        }

        const processPercent = this.getProcessPercent();

        return (
            <RandomWordsPlayingWrapper>
                <p className="text-monospace mb-4">
                    vi: <span className="first-char-capitalize">
                        {currentWord ? currentWord.translate_vi : 'loading'}
                    </span>
                </p>
                <Form className="mb-4" onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="vocabularyRandomWordsInput" className="first-char-capitalize">
                            {this.getWordHint()}
                        </Label>
                        <InputGroup>
                            <Input
                                id="vocabularyRandomWordsInput"
                                placeholder={text('Input your answer...')}
                                autoFocus={true}
                                value={currentInputValue}
                                onChange={this.onInputChange}
                            />
                            <InputGroupAddon addonType="append">
                                <Button
                                    id="vocabularyRandomWordsSkipWordBtn"
                                    type="submit"
                                    color="info"
                                    className="input-group-addon-btn"
                                >
                                    <i className="nc-icon nc-user-run" />
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Form>
                <div className="mb-4">
                    <Progress className="progress-bar-striped" value={processPercent} />
                </div>
                <Button
                    color="info"
                    onClick={onBack}
                >
                    Back
                </Button>
            </RandomWordsPlayingWrapper>
        );
    }
}
