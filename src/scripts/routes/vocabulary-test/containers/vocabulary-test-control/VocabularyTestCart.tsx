import * as React from 'react';
import { Button, Card, CardBody, CardTitle, Input } from 'reactstrap';
import styled from 'styled-components';

import { playAudio } from '@/domain';
import { request, Vocabulary, vocabularyResources } from '@/restful';

const Timer = styled.div`
    padding: 20px;
    border-radius: 50%;
    border: 2px solid #ccc;
    width: 105px;
    height: 105px;
    margin: 0 auto;
`;

interface VocabularyTestCartProps {
    readonly onBack: () => void;
    readonly onComplete: (correctedWords: Vocabulary[], incorrectWords: Vocabulary[]) => void;
}

interface VocabularyTestCartState {
    readonly seconLeft: number;
    readonly currentInputValue: string;
    readonly vocabularies: Vocabulary[];
    readonly currentWord?: Vocabulary;
    readonly currentWordIndex: number;
    readonly addSecond: number;
    readonly correctedWords: Vocabulary[];
    readonly incorrectedWords: Vocabulary[];
}

export class VocabularyTestCart extends React.PureComponent<
    VocabularyTestCartProps,
    VocabularyTestCartState
    > {

    private _interval: number;
    private _isSpeeching: boolean;

    constructor(props: VocabularyTestCartProps) {
        super(props);

        this.state = {
            seconLeft: 60,
            currentInputValue: '',
            vocabularies: [],
            currentWordIndex: NaN,
            addSecond: 0,
            correctedWords: [],
            incorrectedWords: []
        };

        this.fetchResource();
    }

    private readonly playTextContent = async (text: string) => {
        if (this._isSpeeching) {
            return;
        }

        this._isSpeeching = true;
        await playAudio(text, .8);
        this._isSpeeching = false;
    }

    private readonly fetchResource = async () => {
        const randomVocabularies = await request(vocabularyResources.getRandom);

        this.setState(
            {
                vocabularies: randomVocabularies,
                currentWord: randomVocabularies[0],
                currentWordIndex: 0
            }
        );
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
        clearInterval(this._interval);
    }

    private readonly start = () => {
        this._interval = setInterval(
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

    public componentDidUpdate(prevProps: VocabularyTestCartProps, prevState: VocabularyTestCartState) {
        const { currentWord, currentWordIndex, vocabularies } = this.state;

        if (currentWordIndex > vocabularies.length) {
            this.testComplete();

            return;
        }

        if (currentWord && (currentWord !== prevState.currentWord)) {
            this.playTextContent(currentWord.name);
        }

        if (currentWordIndex === 0 && isNaN(prevState.currentWordIndex)) {
            this.start();
        }
    }

    public render() {
        const { onBack } = this.props;
        const { seconLeft, currentInputValue, currentWord } = this.state;

        return (
            <Card data-color="blue" className="card-pricing no-transition">
                <CardBody >
                    <div className="card-icon">
                        <Timer className="h1 text-white text-monospace">
                            {seconLeft}
                        </Timer>
                    </div>
                    <CardTitle className="h3 mb-4 text-monospace">
                        <span className="first-char-capitalize">
                            {currentWord ? currentWord.translate_vi.toLowerCase() : '...loading'}
                        </span>
                    </CardTitle>
                    <p className="card-description">
                        {this.getWordHint()}
                    </p>
                    <div className="mb-4">
                        <form onSubmit={this.onSubmit}>
                            <Input
                                autoFocus={true}
                                className="no-border rounded-pill text-center w-75 ml-auto mr-auto"
                                readOnly={!currentWord}
                                value={currentInputValue}
                                onChange={this.onInputChange}
                            />
                        </form>
                    </div>
                    <div className="text-center">
                        <Button
                            color="link"
                            onClick={onBack}
                        >
                            Back
                        </Button>
                    </div>
                </CardBody>
            </Card>
        );
    }
}
