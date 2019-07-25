import * as React from 'react';
import { Button } from 'reactstrap';

import { SlideUp } from '@/components';
import { text } from '@/i18n';
import { Article } from '@/restful';

import {
    ArticleContent,
    ArticleHeader,
    ArticleLearning
} from './article-control';

interface ArticleControlProps {
    readonly article: Article | null;
}

interface ArticleControlState {
    readonly isLearning: boolean;
}

export class ArticleControl extends React.PureComponent<ArticleControlProps, ArticleControlState> {

    constructor(props: ArticleControlProps) {
        super(props);

        this.state = {
            isLearning: false
        };
    }

    public render() {
        const { article } = this.props;

        const { isLearning } = this.state;

        return (
            <div>
                <ArticleHeader article={article} />
                {
                    isLearning ? (
                        <SlideUp>
                            <ArticleLearning
                                content={article!.content_EN}
                                onCompleted={() => this.setState({ isLearning: false })}
                                onStop={() => this.setState({ isLearning: false })}
                            />
                            
                        </SlideUp>
                    )
                        : (
                            <SlideUp>
                                <ArticleContent article={article} />
                                <div>
                                    <Button
                                        id="startLearning"
                                        color="danger"
                                        disabled={!article}
                                        onClick={() => this.setState({ isLearning: true })}
                                    >
                                        {text('Start')} <i className="nc-icon nc-button-play" />
                                    </Button>
                                </div>
                            </SlideUp>
                        )
                }
            </div>
        );
    }
}
