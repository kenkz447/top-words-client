import { Resource, ResourceType } from 'react-restful';

import { ConversationTopic } from './conversationTopic';

export interface Conversation {
    readonly id: number;
    readonly name: string;
    readonly slug: string;
    readonly content: string;
    readonly conversationTopic: ConversationTopic;
}

export const conversationType = new ResourceType<Conversation>({
    name: nameof<Conversation>()
});

export const conversationResources = {
    count: new Resource<number>({
        url: '/conversations/count'
    }),
    getAll: new Resource<Conversation, Conversation[]>({
        resourceType: conversationType,
        url: '/conversations'
    }),
    getOne: new Resource<Conversation, Conversation[]>({
        resourceType: conversationType,
        url: '/conversations/:id'
    })
};