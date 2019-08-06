import * as React from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

interface VocabularyTestStartCartProps {
    readonly onStart: () => void;
}

export class VocabularyTestStartCart extends React.PureComponent<VocabularyTestStartCartProps> {
    public render() {
        const { onStart } = this.props;
        
        return (
            <Card data-color="blue" className="card-pricing no-transition">
                <CardBody>
                    <div className="card-icon">
                        <span className="icon-simple">
                            <i className="nc-icon nc-watch-time" />
                        </span>
                    </div>
                    <CardTitle className="h3">
                        Ready
                    </CardTitle>
                    <p className="card-description mb-4">
                        We will tell and show random 100 words meaning sequence, please rewrite them in English.
                    </p>
                    <Button
                        color="neutral btn-round"
                        className="mb-4"
                        onClick={onStart}
                    >
                        Start
                    </Button>
                </CardBody>
            </Card>
        );
    }
}
