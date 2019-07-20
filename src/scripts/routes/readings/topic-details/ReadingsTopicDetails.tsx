import { RootContext, RouteInfo, RoutePage } from 'qoobee';
import * as React from 'react';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { READINGS_TOPIC_URL, READINGS_URL } from '@/configs';
import { AppPageProps, policies, WithDomainContext } from '@/domain';
import { text } from '@/i18n';

import { ArticlesFetcher, TopicFetcher } from './containers';

type ReadingsTopicDetailsProps = AppPageProps<{ readonly id: number }>;

export class ReadingsTopicDetails extends RoutePage<ReadingsTopicDetailsProps> {
    public static readonly routeInfo: RouteInfo = {
        path: READINGS_TOPIC_URL,
        title: 'Readings',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    public render() {

        const { match } = this.props;
        const topicId = match.params.id;

        return (
            <PageWrapper>
                <PageHeader
                    defaultBackUrl={READINGS_URL}
                    subTitle={ReadingsTopicDetails.routeInfo.title as string}
                    description={text('Select a artile in this topic to start learning.')}
                />
                <PageContent>
                    <TopicFetcher topicId={topicId} />
                    <ArticlesFetcher topicId={topicId} />
                </PageContent>
            </PageWrapper>
        );
    }
}