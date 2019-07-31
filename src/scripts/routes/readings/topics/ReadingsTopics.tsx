import { RootContext, RouteInfo, RoutePage } from 'qoobee';
import * as React from 'react';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { READINGS_URL } from '@/configs';
import { AppPageProps, policies, WithDomainContext } from '@/domain';
import { text } from '@/i18n';

import { TopicsFetcher } from './containers';

export class ReadingsTopics extends RoutePage<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: READINGS_URL,
        title: 'Readings',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    public render() {

        return (
            <PageWrapper>
                <PageHeader
                    defaultBackUrl="/"
                    title="Top Words"
                    subTitle={ReadingsTopics.routeInfo.title as string}
                    description={text('Select a Topic, each Topic contains many related articles.')}
                />
                <PageContent>
                    <TopicsFetcher />
                </PageContent>
            </PageWrapper>
        );
    }
}