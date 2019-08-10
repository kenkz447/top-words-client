import * as React from 'react';
import { Button } from 'reactstrap';

import { ConversationResult } from '@/restful';

interface SpeakKindergatenResultProps {
    readonly onRestart: () => void;
    readonly result: ConversationResult;
}

export class SpeakKindergatenResult extends React.PureComponent<SpeakKindergatenResultProps> {
    public render() {
        const { onRestart, result } = this.props;

        return (
            <div>
                <div className="h3 text-monospace mb-5">
                    {result.matchingPercent}%
                </div>
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