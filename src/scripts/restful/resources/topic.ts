import { Resource, ResourceType } from 'react-restful';

export interface Topic {
    readonly id: string;
    readonly name: string;
    readonly slug: string;
}

export const TopicType = new ResourceType<Topic>({
    name: nameof<Topic>()
});

export const topicResources = {
    count: new Resource<string>({
        url: '/topics'
    }),
    getAll: new Resource<Topic, Topic[]>({
        resourceType: TopicType,
        url: '/topics',
        getDefaultParams: () => ({
            type: 'query',
            parameter: '_sort',
            value: 'name,asc'
        })
    }),
    getOne: new Resource<Topic, Topic>({
        resourceType: TopicType,
        url: '/topics/:id'
    })
};