import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Route, Switch } from 'react-router';

import { NotFoundPage } from '@/components';

import { Home } from './home';
import {
    ListenWriteArticleDetails,
    ListenWriteTopicDetails,
    ListenWriteTopics
} from './listen-write';
import { VocabularyHome, VocabularyRandomWords } from './vocabulary';

export const routes = routeFrom([
    Home,
    ListenWriteTopics,
    ListenWriteTopicDetails,
    ListenWriteArticleDetails,
    VocabularyHome,
    VocabularyRandomWords
]);

export default () => (
    <Switch>
        {routes}
        <Route component={NotFoundPage} />
    </Switch>
);