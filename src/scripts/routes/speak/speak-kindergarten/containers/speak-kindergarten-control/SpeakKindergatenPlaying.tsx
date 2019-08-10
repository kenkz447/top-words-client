
import * as React from 'react';
import { Button, Spinner } from 'reactstrap';
import styled from 'styled-components';

import { BaseComponent, playAudio, recognition } from '@/domain';
import { Conversation } from '@/restful';
import { splitsentences } from '@/utilities';

const SpeakKindergatenPlayingWrapper = styled.div`
    .message {
        background: #F1F1F1;
        padding: 4px 16px;
        display: inline-block;
        border-radius: 0 15px 15px 0;
    }

    /* stylelint-disable */
    .person {
        margin-bottom: 1px;

        &-A {
            & +.person-B {
                margin-top: 12px;
            }
        }

        &-B {
            & +.person-A {
                margin-top: 12px!important;
            }
        }

        &.me {
            display: flex;
            justify-content: flex-end;
            .message {
                background: var(--success);
                color: #fff;
                border-radius: 15px 0 0 15px;
            }
        }
        &.waiting {
            .message {
                color: lightgray;
            }
        }
    }
    /* stylelint-enable */
`;

interface SpeakKindergatenMessage {
    readonly person: string;
    readonly content: string;
}

interface ContentRecognizeResult {
    readonly contentIndex: number;
    readonly content: string;
}

interface SpeakKindergatenPlayingProps {
    readonly onBack: () => void;
    readonly onComplete: () => void;
    readonly conversation: Conversation;
}

interface SpeakKindergatenPlayingState {
    readonly contents: SpeakKindergatenMessage[];
    readonly playedContents: SpeakKindergatenMessage[];
    readonly currentPlayIndex: number;
    readonly currentPlay: SpeakKindergatenMessage;
    readonly speakPerson: 'A' | 'B';
    readonly contentRecognizes: ContentRecognizeResult[];
}

export class SpeakKindergatenPlaying extends BaseComponent<
    SpeakKindergatenPlayingProps,
    SpeakKindergatenPlayingState
    > {

    constructor(props: SpeakKindergatenPlayingProps) {
        super(props);

        const contents = this.getContents(props.conversation.content);
        const currentPlay = contents[0];
        this.state = {
            contents: contents,
            playedContents: [currentPlay],
            currentPlay: currentPlay,
            currentPlayIndex: 0,
            speakPerson: 'A',
            contentRecognizes: []
        };
    }

    private readonly getContents = (raw: string) => {
        const splited = raw.split(/\r?\n/);
        const contents: SpeakKindergatenMessage[] = [];

        for (const splitedText of splited) {
            const person = splitedText[0];
            const sentences = splitsentences(splitedText);

            contents.push(
                ...sentences.map((sentence) => {
                    return {
                        person: person,
                        content: sentence
                            .trim()
                            .replace(/^(A|B)\:\s/g, '')
                            .replace(/\.$/g, '')
                    };
                })
            );
        }

        return contents;
    }

    private readonly playTextContent = async (content: string) => {
        await playAudio(content);
    }

    private readonly listenContent = async (content: string) => {
        const { onBack } = this.props;

        try {
            const hintContent = content.replace(/[^\w\s]/gi, '');
            const recognitionResult = await recognition(hintContent);

            return recognitionResult;
        } catch (error) {
            if (error === 'not-allowed') {
                return onBack();
            }

            if (error === 'no-speech') {
                this.setState({

                });

                return;
            }

            throw error;
        }
    }

    private readonly gotoNextContent = () => {
        const { currentPlayIndex, contents, playedContents } = this.state;

        const nextPlayIndex = currentPlayIndex + 1;
        const currentPlay = contents[nextPlayIndex];

        if (!currentPlay) {
            this.setState({
                currentPlayIndex: nextPlayIndex
            });

            return;
        }

        this.setState({
            currentPlayIndex: nextPlayIndex,
            currentPlay: currentPlay,
            playedContents: [...playedContents, currentPlay]
        });
    }

    private readonly testComplete = () => {
        const { onComplete } = this.props;

        onComplete();
    }

    private readonly playOrListenContent = async () => {
        const { currentPlay, currentPlayIndex, speakPerson, contentRecognizes } = this.state;

        if (speakPerson === currentPlay.person) {
            const listenResult = await this.listenContent(currentPlay.content);

            this.setState({
                contentRecognizes: [
                    ...contentRecognizes,
                    {
                        contentIndex: currentPlayIndex,
                        content: listenResult as string
                    }
                ]
            });
        } else {
            await this.playTextContent(currentPlay.content);
        }

        this.gotoNextContent();
    }

    public componentDidUpdate(prevProps: SpeakKindergatenPlayingProps, prevState: SpeakKindergatenPlayingState) {
        const { contents, currentPlayIndex } = this.state;

        if (contents.length === currentPlayIndex) {
            this.testComplete();

            return;
        }

        if (currentPlayIndex > prevState.currentPlayIndex) {
            this.playOrListenContent();
        }
    }

    public componentDidMount() {
        this.playOrListenContent();
    }

    public render() {
        const { onBack, conversation } = this.props;
        const { playedContents, speakPerson, currentPlayIndex } = this.state;

        return (
            <SpeakKindergatenPlayingWrapper>
                <h4 className="mb-4">{conversation.name}</h4>
                <div className="mb-5">
                    {
                        playedContents.map((o, i) => {
                            const isMe = o.person === speakPerson;
                            const isSpeaking = isMe && currentPlayIndex === i;

                            return (
                                <p
                                    key={i}
                                    className={
                                        this.classNames(
                                            `person person-${o.person}`,
                                            { me: isMe },
                                            { waiting: isSpeaking }
                                        )
                                    }
                                >
                                    {isSpeaking && <Spinner type="grow" color="success" />}
                                    <span className={this.classNames('message', `message-${o.person}`)}>
                                        {o.content}
                                    </span>
                                </p>
                            );
                        })
                    }
                </div>
                <Button
                    color="success"
                    onClick={onBack}
                >
                    Back
                </Button>
            </SpeakKindergatenPlayingWrapper>
        );
    }
}
