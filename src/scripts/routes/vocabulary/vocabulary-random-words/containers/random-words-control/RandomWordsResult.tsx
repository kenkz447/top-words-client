import * as React from 'react';
import { Button } from 'reactstrap';

import { VocabularyTestResult } from '@/restful';

interface RandomWordsResultProps {
    readonly onRestart: () => void;
    readonly result: VocabularyTestResult;
}

export class RandomWordsResult extends React.PureComponent<RandomWordsResultProps> {
    public render() {
        const { onRestart, result } = this.props;

        return (
            <div>
                <div className="h3 text-monospace">
                    Score: {result.score}
                </div>
                <p className="card-description mb-4">
                    You are correct {result.correctWords.length} words, incorrect {result.incorrectWords.length} words
                </p>
                <Button
                    color="info"
                    onClick={onRestart}
                >
                    Restart
                </Button>
            </div>
        );
    }
}