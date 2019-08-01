import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { articleResources } from '@/restful';

import { ArticleControl } from './article-fetcher';

interface ArticleFetcherProps {
    readonly articleSlug: string;
}

export class ArticleFetcher extends React.PureComponent<ArticleFetcherProps> {

    public render() {
        const { articleSlug } = this.props;

        return (
            <RestfulRender
                resource={articleResources.getAll}
                parameters={{
                    type: 'query',
                    parameter: 'slug',
                    value: articleSlug
                }}
            >
                {({ data }) => {
                    if (!data) {
                        return <Loading />;
                    }

                    return (
                        <ArticleControl article={data[0]} />
                    );
                }}
            </RestfulRender>
        );
    }
}
