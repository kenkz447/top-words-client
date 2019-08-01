import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Route, Switch } from 'react-router';

import { NotFoundPage } from '@/components';

import { Home } from './home';
import { ListenWriteArticleDetails } from './listen-write/article-details';
import { ListenWriteTopicDetails } from './listen-write/topic-details';
import { ListenWriteTopics } from './listen-write/topics';
import { VocabularyTest } from './vocabulary-test';

export const routes = routeFrom([
    Home,
    ListenWriteTopics,
    ListenWriteTopicDetails,
    ListenWriteArticleDetails,
    VocabularyTest
]);

export default () => (
    <Switch>
        {routes}
        <Route component={NotFoundPage} />
    </Switch>
);