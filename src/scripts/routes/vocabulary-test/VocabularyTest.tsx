import { RootContext, RouteInfo, RoutePage } from 'qoobee';
import * as React from 'react';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { VOCABULARY_TEST_URL } from '@/configs';
import { AppPageProps, policies, WithDomainContext } from '@/domain';

import { VocabularyTestControl } from './containers';

export class VocabularyTest extends RoutePage<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: VOCABULARY_TEST_URL,
        title: 'Vocabulary Test',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    public render() {

        return (
            <PageWrapper>
                <PageHeader
                    subTitle="Vocabulary Test"
                    subTitleColor="info"
                    description="Make sure you are not forget something with small test"
                    defaultBackUrl="/"
                    backBtnText="Top Words"
                />
                <PageContent>
                    <VocabularyTestControl />
                </PageContent>
            </PageWrapper>
        );
    }
}