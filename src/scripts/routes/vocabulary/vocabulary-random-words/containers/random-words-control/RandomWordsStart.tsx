import * as React from 'react';
import { Button } from 'reactstrap';

interface RandomWordsStartProps {
    readonly onStart: () => void;
}

export class RandomWordsStart extends React.PureComponent<RandomWordsStartProps> {
    public render() {
        const { onStart } = this.props;

        return (
            <div>
                <p className="mb-4">
                    We will speak and display 100 random words meaning.
                    You need to rewrite them all in English, good luck!
                </p>
                <Button
                    color="info"
                    className="mb-4"
                    onClick={onStart}
                >
                    Start
                </Button>
            </div>
        );
    }
}
