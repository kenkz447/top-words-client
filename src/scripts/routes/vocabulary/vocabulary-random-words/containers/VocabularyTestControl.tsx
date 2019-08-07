import * as React from 'react';
import { RestfulRender } from 'react-restful';

import {
    caculateVocabularyTestResultScore
} from '@/business/vocabulary-test-result';
import { Loading } from '@/components';
import {
    Vocabulary,
    vocabularyResources,
    VocabularyTestResult
} from '@/restful';

import {
    RandomWordsPlaying,
    RandomWordsResult,
    RandomWordsStart
} from './random-words-control';

interface RandomWordsControlProps {
}

interface RandomWordsControlState {
    readonly activeCard: 'start' | 'test' | 'result';
    readonly results: VocabularyTestResult[];
    readonly latestResult?: VocabularyTestResult;
}

export class RandomWordsControl extends React.PureComponent<
    RandomWordsControlProps,
    RandomWordsControlState> {

    constructor(props: RandomWordsControl) {
        super(props);

        this.state = {
            activeCard: 'start',
            results: []
        };
    }

    public readonly onTestComplete = async (correctWords: Vocabulary[], incorrectWords: Vocabulary[]) => {
        const { results } = this.state;

        const result: VocabularyTestResult = {
            id: Math.random().toString(),
            correctWords: correctWords,
            incorrectWords: incorrectWords,
            createdAt: (new Date).toISOString(),
            score: caculateVocabularyTestResultScore({
                correctWords: correctWords
            })
        };

        this.setState({
            activeCard: 'result',
            results: [...results, result],
            latestResult: result
        });
    }

    public render() {
        const { activeCard, latestResult } = this.state;

        return (
            <div className="container-small">
                {activeCard === 'start' &&
                    <RandomWordsStart
                        onStart={() => this.setState({ activeCard: 'test' })}
                    />
                }
                {activeCard === 'test' &&
                    (
                        <RestfulRender
                            resource={vocabularyResources.getRandom}
                        >
                            {(render) => {
                                const { data } = render;

                                if (!data) {
                                    return <Loading />;
                                }

                                return (
                                    <RandomWordsPlaying
                                        vocabularies={data}
                                        onBack={() => this.setState({ activeCard: 'start' })}
                                        onComplete={this.onTestComplete}
                                    />
                                );
                            }}
                        </RestfulRender>
                    )
                }
                {
                    (activeCard === 'result' && latestResult) && (
                        <RandomWordsResult
                            onRestart={() => this.setState({ activeCard: 'test' })}
                            result={latestResult}
                        />
                    )
                }
            </div>
        );
    }
}
