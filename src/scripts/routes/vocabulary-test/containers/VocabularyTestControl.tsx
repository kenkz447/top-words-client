import * as React from 'react';

import {
    VocabularyTestCart,
    VocabularyTestStartCart
} from './vocabulary-test-control';

interface VocabularyTestControlProps {
}

interface VocabularyTestControlState {
    readonly activeCard: 'start' | 'test' | 'result';
}

export class VocabularyTestControl extends React.PureComponent<
    VocabularyTestControlProps,
    VocabularyTestControlState> {

    constructor(props: VocabularyTestControl) {
        super(props);

        this.state = {
            activeCard: 'start'
        };
    }

    public render() {
        const { activeCard } = this.state;

        return (
            <div className="container-small">
                {activeCard === 'start' &&
                    <VocabularyTestStartCart
                        onStart={() => this.setState({ activeCard: 'test' })}
                    />
                }
                {activeCard === 'test' && <VocabularyTestCart onBack={() => this.setState({ activeCard: 'start' })} />}
            </div>
        );
    }
}
