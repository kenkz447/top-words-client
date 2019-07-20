import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { articleResources } from '@/restful';

import { ArticleControl } from './article-fetcher';

interface ArticleFetcherProps {
    readonly topicId: number;
}

export class ArticleFetcher extends React.PureComponent<ArticleFetcherProps> {
    public render() {
        const { topicId } = this.props;

        return (
            <RestfulRender
                resource={articleResources.getOne}
                parameters={{
                    type: 'path',
                    parameter: 'id',
                    value: topicId
                }}
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
