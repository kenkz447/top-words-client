import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { Loading } from '@/components';
import { BaseComponent } from '@/domain';
import { conversationTopicGroupResources } from '@/restful';

import {
    ConversationTopicGroupList
} from './conversation-topic-groups-fetcher';

interface ConversationTopicGroupsFetcherProps {
}

interface ConversationTopicGroupsFetcherState {
}

export class ConversationTopicGroupsFetcher extends BaseComponent<
    ConversationTopicGroupsFetcherProps,
    ConversationTopicGroupsFetcherState
    > {
    
    public render() {
        return (
            <RestfulRender
                resource={conversationTopicGroupResources.getAll}
            >
                {({ data, fetching }) => {
                    if (!data && fetching) {
                        return <Loading />;
                    } 

                    return (
                        <div className="container-small">
                            <ConversationTopicGroupList
                                conversationTopicGroup={data!}
                            />
                        </div>
                    );
                }}
            </RestfulRender>
        );
    }
}
