import { Resource, ResourceType } from 'react-restful';

export interface Article {
    readonly id: string;
    readonly name: string;
    readonly content_EN: string;
    readonly content_VI: string;
}

export const articleType = new ResourceType<Article>({
    name: nameof<Article>()
});

export const articleResources = {
    count: new Resource<number>({
        url: '/articles/count'
    }),
    getAll: new Resource<Article, Article[]>({
        resourceType: articleType,
        url: '/articles'
    }),
    getOne: new Resource<Article, Article>({
        resourceType: articleType,
        url: '/articles/:id'
    })
};