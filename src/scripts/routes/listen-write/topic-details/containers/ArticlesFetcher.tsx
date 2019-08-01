import * as classNames from 'classnames';
import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { DelayRender, Loading, Pagination } from '@/components';
import { BasePaginationComponent } from '@/domain';
import { articleResources } from '@/restful';

import { ArticleList } from './articles-fetcher';

interface ArticlesFetcherProps {
    readonly topicSlug: string;
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
                    type: 'query',
                    parameter: 'topic.slug',
                    value: props.topicSlug
                }]
        };
    }

    public render() {
        const { topicSlug } = this.props;
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
                                topicSlug={topicSlug}
                            />
                            <DelayRender timeout={this.isSmallDevice() ? 0 : 700}>
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
                                    loading={fetching}
                                />
                            </DelayRender>
                        </div>
                    );
                }}
            </RestfulRender>
        );
    }
}
