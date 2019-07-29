import * as React from 'react';
import { Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { SlideUp } from '@/components';
import { text } from '@/i18n';
import { Article } from '@/restful';

import {
    ArticleContent,
    ArticleHeader,
    ArticleLearning,
    ArticlePrevNext
} from './article-control';

interface ArticleControlProps {
    readonly article: Article;
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
                                content={article!.content}
                                onCompleted={() => this.setState({ isLearning: false })}
                                onStop={() => this.setState({ isLearning: false })}
                            />

                        </SlideUp>
                    )
                        : (
                            <SlideUp className=" container-medium ">
                                <ArticleContent article={article} />
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <Button
                                            id="startLearning"
                                            color="danger"
                                            disabled={!article}
                                            onClick={() => this.setState({ isLearning: true })}
                                        >
                                            {text('Start')} <i className="nc-icon nc-button-play" />
                                        </Button>
                                    </div>
                                    <div>
                                        <ArticlePrevNext article={article} />
                                    </div>
                                </div>
                            </SlideUp>
                        )
                }
            </div>
        );
    }
}
