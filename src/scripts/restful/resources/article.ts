import { Resource, ResourceType } from 'react-restful';

import { Vocabulary } from './vocabulary';

export interface Article {
    readonly id: string;
    readonly name: string;
    readonly content: string;
    readonly slug: string;
    readonly vocabularies: Vocabulary[];
    readonly cloze?: string;
    readonly topic: string;
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