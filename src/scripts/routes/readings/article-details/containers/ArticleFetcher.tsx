import * as React from 'react';
import { RequestParameter, RestfulRender } from 'react-restful';

import { articleResources } from '@/restful';

import { ArticleControl } from './article-fetcher';

interface ArticleFetcherProps {
    readonly topicId: number;
}

interface ArticleFetcherState {
    readonly params: RequestParameter[];
}

export class ArticleFetcher extends React.PureComponent<ArticleFetcherProps, ArticleFetcherState> {

    constructor(props: ArticleFetcherProps) {
        super(props);

        this.state = {
            params: [{
                type: 'path',
                parameter: 'id',
                value: props.topicId
            }]
        };
    }
    
    public render() {
        const { params } = this.state;

        return (
            <RestfulRender
                resource={articleResources.getOne}
                parameters={params}
            >
                {({ data }) => {
                    return (
                        <ArticleControl article={data} />
                    );
                }}
            </RestfulRender>
        );
    }
}
