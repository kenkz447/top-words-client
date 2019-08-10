import { Resource, ResourceType } from 'react-restful';

export interface ConversationTopicGroup {
    readonly id: number;
    readonly name: string;
    readonly slug: string;
    readonly level: 'beginner' | 'intermediate';
}

export const conversationTopicGroupType = new ResourceType<ConversationTopicGroup>({
    name: nameof<ConversationTopicGroup>()
});

export const conversationTopicGroupResources = {
    count: new Resource<number>({
        url: '/conversationTopicGroups/count'
    }),
    getAll: new Resource<ConversationTopicGroup, ConversationTopicGroup[]>({
        resourceType: conversationTopicGroupType,
        url: '/conversationTopicGroups'
    })
};