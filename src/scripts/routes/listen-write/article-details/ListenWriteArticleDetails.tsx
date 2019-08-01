import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import {
    LISTEN_WRITING_ARTICLE_URL,
    LISTEN_WRITING_TOPIC_URL
} from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';
import { replaceRoutePath } from '@/utilities';

import { ArticleFetcher } from './containers';

type ListenWriteArticleDetailsProps = AppPageProps<{
    readonly topicSlug: string;
    readonly articleSlug: string;
}>;

export class ListenWriteArticleDetails extends BasePageComponent<ListenWriteArticleDetailsProps> {
    public static readonly routeInfo: RouteInfo = {
        path: LISTEN_WRITING_ARTICLE_URL,
        title: 'ListenWrite',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {

        const { match } = this.props;
        const { topicSlug, articleSlug } = match.params;

        return (
            <PageWrapper>
                <PageHeader
                    defaultBackUrl={replaceRoutePath(LISTEN_WRITING_TOPIC_URL, { topicSlug })}
                />
                <PageContent>
                    <ArticleFetcher articleSlug={articleSlug} />
                </PageContent>
            </PageWrapper>
        );
    }
}