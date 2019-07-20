import { routeFrom } from 'qoobee';
import * as React from 'react';
import { Route, Switch } from 'react-router';

import { NotFoundPage } from '@/components';

import { Home } from './home';
import { ReadingsArticleDetails } from './readings/article-details';
import { ReadingsTopicDetails } from './readings/topic-details';
import { ReadingsTopics } from './readings/topics';

export const routes = routeFrom([
    Home,
    ReadingsTopics,
    ReadingsTopicDetails,
    ReadingsArticleDetails
]);

export default () => (
    <Switch>
        {routes}
        <Route component={NotFoundPage} />
    </Switch>
);