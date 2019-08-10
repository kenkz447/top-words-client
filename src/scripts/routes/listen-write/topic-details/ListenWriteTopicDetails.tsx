import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { LISTEN_WRITING_TOPIC_URL, LISTEN_WRITING_URL } from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';
import { text } from '@/i18n';

import { ArticlesFetcher, TopicFetcher } from './containers';

type ListenWriteTopicDetailsProps = AppPageProps<{ readonly topicSlug: string }>;

export class ListenWriteTopicDetails extends BasePageComponent<ListenWriteTopicDetailsProps> {
    public static readonly routeInfo: RouteInfo = {
        path: LISTEN_WRITING_TOPIC_URL,
        title: 'Listen & Write',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {
        const { match } = this.props;
        const { topicSlug } = match.params;

        return (
            <PageWrapper>
                <PageHeader
                    defaultBackUrl={LISTEN_WRITING_URL}
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