import * as React from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

import { VocabularyTestResult } from '@/restful';

interface VocabularyTestResultCardProps {
    readonly onRestart: () => void;
    readonly result: VocabularyTestResult;
}

export class VocabularyTestResultCard extends React.PureComponent<VocabularyTestResultCardProps> {
    public render() {
        const { onRestart, result } = this.props;

        return (
            <Card data-color="blue" className="card-pricing no-transition">
                <CardBody>
                    <div className="card-icon">
                        <span className="icon-simple">
                            <i className="nc-icon nc-check-2" />
                        </span>
                    </div>
                    <CardTitle className="h3 text-monospace">
                        Score: {result.score}
                    </CardTitle>
                    <p className="card-description mb-4">
                        Correct {result.correctWords.length} words
                        <br />
                        Incorrect {result.incorrectWords.length} words
                    </p>
                    <Button
                        color="neutral btn-round"
                        className="mb-4"
                        onClick={onRestart}
                    >
                        Restart
                    </Button>
                </CardBody>
            </Card>
        );
    }
}