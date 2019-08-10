import * as React from 'react';
import { Button } from 'reactstrap';

interface SpeakKindergatenStartProps {
    readonly onStart: () => void;
}

export class SpeakKindergatenStart extends React.PureComponent<SpeakKindergatenStartProps> {
    public render() {
        const { onStart } = this.props;

        return (
            <div>
                <p className="mb-4">
                    take a very short conversation to learn how to start speaking english.
                </p>
                <Button
                    color="success"
                    className="mb-4"
                    onClick={async () => {
                        const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
                        if (permissionStatus.state === 'denied') {
                            return;
                        }

                        onStart();
                    }}
                >
                    Start
                </Button>
            </div>
        );
    }
}
