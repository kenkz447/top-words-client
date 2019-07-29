import * as React from 'react';
import { getParamsValue, RestfulRender } from 'react-restful';

import { BaseHistoryListenComponent } from '@/domain';
import { topicResources } from '@/restful';

import { TopicFilter, TopicList } from './topics-fetcher';

interface TopicsFetcherProps {
}

interface TopicsFetcherState {
}

export class TopicsFetcher extends BaseHistoryListenComponent<TopicsFetcherProps, TopicsFetcherState> {
    constructor(props: TopicsFetcherProps) {
        super(props);

        this.state = {
            params: [],
            defaultParams: { level : 'beginner'}
        };
    }

    public render() {
        const { params } = this.state;

        if (!params.length) {
            return null;
        }

        return (
            <RestfulRender
                resource={topicResources.getAll}
                parameters={params}
            >
                {({ data, fetching }) => {
                    const currenLevel = getParamsValue(params, 'query', 'level')! as string;

                    return (
                        <div className="container-small">
                            <div className="mb-4">
                                <TopicFilter currentLevel={currenLevel} />
                            </div>
                            <TopicList
                                topics={data || undefined}
                                loading={fetching}
                            />
                        </div>
                    );
                }}
            </RestfulRender>
        );
    }
}
