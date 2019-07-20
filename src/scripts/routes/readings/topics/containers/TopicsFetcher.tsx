import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { topicResources } from '@/restful';

import { TopicList } from './topics-fetcher';

interface TopicsFetcherProps {
}

export class TopicsFetcher extends React.PureComponent<TopicsFetcherProps> {
    public render() {
        return (
            <RestfulRender
                resource={topicResources.getAll}
            >
                {({ data, fetching }) => {
                    return (
                        <TopicList
                            topics={data || undefined}
                            loading={fetching}
                        />
                    );
                }}
            </RestfulRender>
        );
    }
}
