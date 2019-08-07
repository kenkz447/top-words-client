import * as React from 'react';

import {
    caculateVocabularyTestResultScore
} from '@/business/vocabulary-test-result';
import {
    getObjectId,
    request,
    Vocabulary,
    VocabularyTestResult,
    vocabularyTestResultResources
} from '@/restful';

import {
    VocabularyTestCart,
    VocabularyTestResultCard,
    VocabularyTestStartCart
} from './vocabulary-test-control';

interface VocabularyTestControlProps {
}

interface VocabularyTestControlState {
    readonly activeCard: 'start' | 'test' | 'result';
    readonly results: VocabularyTestResult[];
    readonly latestResult?: VocabularyTestResult;
}

export class VocabularyTestControl extends React.PureComponent<
    VocabularyTestControlProps,
    VocabularyTestControlState> {

    constructor(props: VocabularyTestControl) {
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
                    <VocabularyTestStartCart
                        onStart={() => this.setState({ activeCard: 'test' })}
                    />
                }
                {activeCard === 'test' &&
                    (
                        <VocabularyTestCart
                            onBack={() => this.setState({ activeCard: 'start' })}
                            onComplete={this.onTestComplete}
                        />
                    )
                }
                {
                    (activeCard === 'result' && latestResult) && (
                        <VocabularyTestResultCard
                            onRestart={() => this.setState({ activeCard: 'test' })}
                            result={latestResult}
                        />
                    )
                }
            </div>
        );
    }
}
