import { Resource, ResourceType } from 'react-restful';

import { Vocabulary } from './vocabulary';

export interface VocabularyTestResult {
    readonly id: string;
    readonly correctWords: Vocabulary[];
    readonly incorrectWords: Vocabulary[];
    readonly score: number;
    readonly createdAt: string;
}

export const vocabularyTestResultResourceType = new ResourceType<Vocabulary>({
    name: nameof<Vocabulary>()
});

export const vocabularyTestResultResources = {
    caculateScore: new Resource<number>({
        url: '/vocabularytestresults/caculate-score'
    })
};