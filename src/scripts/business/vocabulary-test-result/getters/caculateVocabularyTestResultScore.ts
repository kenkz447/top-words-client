import sumBy from 'lodash/sumBy';

import { VocabularyTestResult } from '@/restful';

export const caculateVocabularyTestResultScore = (vocabularyTestResult: Partial<VocabularyTestResult>) => {
    if (!vocabularyTestResult || !vocabularyTestResult.correctWords) {
        return 0;
    }

    return sumBy(vocabularyTestResult.correctWords, (word) => word.name.length);
};