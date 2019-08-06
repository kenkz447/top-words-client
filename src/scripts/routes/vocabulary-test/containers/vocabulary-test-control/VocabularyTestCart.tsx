import { async } from 'q';
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
}

interface VocabularyTestCartState {
    readonly seconLeft: number;
    readonly currentInputValue: string;
    readonly vocabularies: Vocabulary[];
    readonly currentVocabulary?: Vocabulary;
    readonly progressIndex: number;
    readonly addSecond: number;
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
            progressIndex: NaN,
            addSecond: 1
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
                currentVocabulary: randomVocabularies[0],
                progressIndex: 0
            },
            () => {
                const { currentVocabulary } = this.state;

                if (!currentVocabulary) {
                    return;
                }

                this.playTextContent(currentVocabulary.name);
            }
        );
    }

    private readonly onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const { vocabularies, progressIndex } = this.state;

        const nextProjectIndex = progressIndex + 1;

        this.setState(
            {
                progressIndex: nextProjectIndex,
                currentVocabulary: vocabularies[nextProjectIndex],
                currentInputValue: '',
                addSecond: -6,
            },
            () => {
                const { currentVocabulary } = this.state;

                if (!currentVocabulary) {
                    return;
                }

                this.playTextContent(currentVocabulary.name);
            });
    }

    private readonly onInputChange = (e) => {
        const { value } = e.target;

        const { currentVocabulary, vocabularies, progressIndex } = this.state;
        if (!currentVocabulary) {
            return;
        }

        if (currentVocabulary.name === value) {
            const nextProgesIndex = progressIndex + 1;
            const nextVocabulary = vocabularies[nextProgesIndex];
            this.setState({
                progressIndex: nextProgesIndex,
                currentVocabulary: nextVocabulary,
                currentInputValue: '',
                addSecond: currentVocabulary.name.length
            });

            this.playTextContent(nextVocabulary.name);
            
            return;
        }

        this.setState({
            currentInputValue: value
        });
    }

    public componentDidMount() {
        this._interval = setInterval(
            () => {
                const { onBack } = this.props;
                const { seconLeft, addSecond } = this.state;
                const nextSeconLeft = seconLeft + addSecond;

                if (nextSeconLeft >= 0) {
                    this.setState({
                        seconLeft: nextSeconLeft,
                        addSecond: -1
                    });

                    return;
                }

                onBack();
            },
            1000
        );
    }

    public componentWillUnmount() {
        clearInterval(this._interval);
    }

    public render() {
        const { onBack } = this.props;
        const { seconLeft, currentInputValue, currentVocabulary } = this.state;

        return (
            <Card data-color="blue" className="card-pricing no-transition">
                <CardBody >
                    <div className="card-icon">
                        <Timer className="h1 text-white text-monospace">
                            {seconLeft}
                        </Timer>
                    </div>
                    <CardTitle className="h3 mb-4 text-monospace">
                        {currentVocabulary ? currentVocabulary.translate_vi : '...loading'}
                    </CardTitle>

                    <div className="mb-4">
                        <form onSubmit={this.onSubmit}>
                            <Input
                                autoFocus={true}
                                className="no-border rounded-pill text-center w-75 ml-auto mr-auto"
                                placeholder="..."
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
