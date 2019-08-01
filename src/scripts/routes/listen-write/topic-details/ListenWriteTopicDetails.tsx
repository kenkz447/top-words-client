import { RootContext, RouteInfo, RoutePage } from 'qoobee';
import * as React from 'react';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { LISTEN_WRITING_TOPIC_URL, LISTEN_WRITING_URL } from '@/configs';
import { AppPageProps, policies, WithDomainContext } from '@/domain';
import { text } from '@/i18n';

import { ArticlesFetcher, TopicFetcher } from './containers';

type ListenWriteTopicDetailsProps = AppPageProps<{ readonly topicSlug: string }>;

export class ListenWriteTopicDetails extends RoutePage<ListenWriteTopicDetailsProps> {
    public static readonly routeInfo: RouteInfo = {
        path: LISTEN_WRITING_TOPIC_URL,
        title: 'ListenWrite',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    public render() {
        const { match } = this.props;
        const { topicSlug } = match.params;

        return (
            <PageWrapper>
                <PageHeader
                    defaultBackUrl={LISTEN_WRITING_URL}
                    title="Top Words"
                    subTitle={ListenWriteTopicDetails.routeInfo.title as string}
                    description={text('Select a artile in this topic to start learning.')}
                />
                <PageContent>
                    <TopicFetcher topicSlug={topicSlug} />
                    <ArticlesFetcher topicSlug={topicSlug} />
                </PageContent>
            </PageWrapper>
        );
    }
}