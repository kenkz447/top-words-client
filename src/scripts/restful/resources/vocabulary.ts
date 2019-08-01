import { Resource, ResourceType } from 'react-restful';

export interface Vocabulary {
    readonly id: string;
    readonly name: string;
    readonly translate_vi: string;
}

export const vocabularyResourceType = new ResourceType<Vocabulary>({
    name: nameof<Vocabulary>()
});

export const vocabularyResources = {
    getRandom: new Resource<Vocabulary, Vocabulary[]>({
        resourceType: vocabularyResourceType,
        url: '/vocabularies/random',
        getDefaultParams: () => ({
            type: 'query', parameter: 'quantity', value: 100
        })
    })
};