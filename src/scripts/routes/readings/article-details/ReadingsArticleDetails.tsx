import { RootContext, RouteInfo, RoutePage } from 'qoobee';
import * as React from 'react';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import {
    READINGS_ARTICLE_URL,
    READINGS_TOPIC_URL,
    READINGS_URL
} from '@/configs';
import { AppPageProps, policies, WithDomainContext } from '@/domain';
import { text } from '@/i18n';
import { replaceRoutePath } from '@/utilities';

import { ArticleFetcher } from './containers';

type ReadingsArticleDetailsProps = AppPageProps<{ readonly id: number }>;

export class ReadingsArticleDetails extends RoutePage<ReadingsArticleDetailsProps> {
    public static readonly routeInfo: RouteInfo = {
        path: READINGS_ARTICLE_URL,
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
                    defaultBackUrl=""
                    subTitle={ReadingsArticleDetails.routeInfo.title as string}
                    description={text('Select a artile in this topic to start learning.')}
                />
                <PageContent>
                    <ArticleFetcher topicId={topicId} />
                </PageContent>
            </PageWrapper>
        );
    }
}