import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { articleResources } from '@/restful';

import { ArticleList } from './articles-fetcher';

interface ArticlesFetcherProps {
    readonly topicId: number;
}

export class ArticlesFetcher extends React.PureComponent<ArticlesFetcherProps> {
    public render() {
        const { topicId } = this.props;
        
        return (
            <RestfulRender
                resource={articleResources.getAll}
                parameters={{
                    type: 'query',
                    parameter: 'topic',
                    value: topicId
                }}
            >
                {({ data, fetching }) => {
                    return (
                        <ArticleList
                            articles={data || undefined}
                            loading={fetching}
                        />
                    );
                }}
            </RestfulRender>
        );
    }
}
