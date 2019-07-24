import * as classNames from 'classnames';
import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading, Pagination } from '@/components';
import { BasePaginationComponent } from '@/domain';
import { articleResources } from '@/restful';

import { ArticleList } from './articles-fetcher';

interface ArticlesFetcherProps {
    readonly topicId: number;
}

interface ArticleFetcherState {
}

export class ArticlesFetcher extends BasePaginationComponent<ArticlesFetcherProps, ArticleFetcherState> {

    public readonly countItemResource = articleResources.count;

    constructor(props: ArticlesFetcherProps) {
        super(props);
        this.state = {
            countItemResource: articleResources.count,
            requestParams: [
                ...this.getDefaultRequestParams(),
                {
                    type: 'path',
                    parameter: 'id',
                    value: props.topicId
                }]
        };
    }

    public render() {
        const { requestParams, totalItem } = this.state;

        return (
            <RestfulRender
                resource={articleResources.getAll}
                parameters={requestParams}
            >
                {({ data, fetching }) => {
                    if (!data && fetching) {
                        return <Loading />;
                    }
                    
                    return (
                        <div
                            className={classNames({
                                'display-flex': this.isSmallDevice(),
                                'flex-direction-row-reverse': this.isSmallDevice()
                            })}
                        >
                            <ArticleList
                                className="container-small mb-3"
                                articles={data || undefined}
                                loading={fetching}
                            />
                            <Pagination
                                className={classNames({
                                    'mr-3': this.isSmallDevice(),
                                    'pagination-vertical': this.isSmallDevice()
                                })}
                                totalItem={totalItem}
                                vetical={this.isSmallDevice()}
                                limit={this.getPaginationMeta('_limit')}
                                start={this.getPaginationMeta('_start')}
                                getPagerUrl={this.getPagerUrl}
                            />
                        </div>
                    );
                }}
            </RestfulRender>
        );
    }
}
