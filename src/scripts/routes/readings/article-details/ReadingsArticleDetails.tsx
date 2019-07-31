import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { READINGS_ARTICLE_URL, READINGS_TOPIC_URL } from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';
import { text } from '@/i18n';
import { replaceRoutePath } from '@/utilities';

import { ArticleFetcher } from './containers';

type ReadingsArticleDetailsProps = AppPageProps<{
    readonly topicSlug: string;
    readonly articleSlug: string;
}>;

export class ReadingsArticleDetails extends BasePageComponent<ReadingsArticleDetailsProps> {
    public static readonly routeInfo: RouteInfo = {
        path: READINGS_ARTICLE_URL,
        title: 'Readings',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {

        const { match } = this.props;
        const { topicSlug, articleSlug } = match.params;

        return (
            <PageWrapper>
                <PageHeader
                    defaultBackUrl={replaceRoutePath(READINGS_TOPIC_URL, { topicSlug })}
                />
                <PageContent>
                    <ArticleFetcher articleSlug={articleSlug} />
                </PageContent>
            </PageWrapper>
        );
    }
}