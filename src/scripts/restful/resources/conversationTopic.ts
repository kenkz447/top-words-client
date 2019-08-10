import { Resource, ResourceType } from 'react-restful';

import { ConversationTopicGroup } from './conversationTopicGroup';

export interface ConversationTopic {
    readonly id: number;
    readonly name: string;
    readonly slug: string;
    readonly conversationTopicGroup: ConversationTopicGroup;
}

export const conversationTopicType = new ResourceType<ConversationTopic>({
    name: nameof<ConversationTopic>()
});

export const conversationTopicResources = {
    count: new Resource<number>({
        url: '/conversationTopics/count'
    }),
    getAll: new Resource<ConversationTopic, ConversationTopic[]>({
        resourceType: conversationTopicType,
        url: '/conversationTopics'
    })
};