import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { conversationResources, ConversationResult } from '@/restful';

import {
    SpeakKindergatenPlaying,
    SpeakKindergatenResult,
    SpeakKindergatenStart
} from './speak-kindergarten-control';

interface SpeakKindergatenControlProps {
}

interface SpeakKindergatenControlState {
    readonly activeCard: 'start' | 'test' | 'result';
    readonly results: ConversationResult[];
    readonly latestResult?: ConversationResult;
}

export class SpeakKindergatenControl extends React.PureComponent<
    SpeakKindergatenControlProps,
    SpeakKindergatenControlState> {

    constructor(props: SpeakKindergatenControl) {
        super(props);

        this.state = {
            activeCard: 'start',
            results: []
        };
    }

    public readonly onTestComplete = async () => {
        const { results } = this.state;

        const result: ConversationResult = {
            matchingPercent: 0
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
                    <SpeakKindergatenStart
                        onStart={() => this.setState({ activeCard: 'test' })}
                    />
                }
                {activeCard === 'test' &&
                    (
                        <RestfulRender
                            resource={conversationResources.getAll}
                            parameters={{
                                type: 'query',
                                parameter: 'conversationTopic.slug',
                                value: 'learn-to-speak-kindergarten-english'
                            }}
                        >
                            {(render) => {
                                const { data } = render;

                                if (!data) {
                                    return <Loading />;
                                }

                                return (
                                    <SpeakKindergatenPlaying
                                        onBack={() => this.setState({ activeCard: 'start' })}
                                        onComplete={this.onTestComplete}
                                        conversation={data[0]}
                                    />
                                );
                            }}
                        </RestfulRender>
                    )
                }
                {
                    (activeCard === 'result' && latestResult) && (
                        <SpeakKindergatenResult
                            onRestart={() => this.setState({ activeCard: 'test' })}
                            result={latestResult}
                        />
                    )
                }
            </div>
        );
    }
}
