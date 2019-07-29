import { Resource, ResourceType } from 'react-restful';

export interface Article {
    readonly id: string;
    readonly name: string;
    readonly content: string;
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
    }),
    getNextAndPrev: new Resource<Article, { readonly prev: Article, readonly next: Article }>({
        url: '/articles/prev-and-next/:id'
    })
};