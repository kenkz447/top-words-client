import { RootContext, RouteInfo, RoutePage } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { VOCABULARY_RANDOM_WORDS_URL, VOCABULARY_URL } from '@/configs';
import { AppPageProps, policies, WithDomainContext } from '@/domain';

export class VocabularyHome extends RoutePage<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: VOCABULARY_URL,
        title: 'Vocabulary',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    public render() {

        return (
            <PageWrapper>
                <PageHeader
                    subTitle="Vocabulary"
                    subTitleColor="info"
                    description="Learn new words and improve your English."
                    defaultBackUrl="/"
                />
                <PageContent>
                    <Button
                        color="info"
                        className="btn-round"
                        outline={true}
                        tag={Link}
                        to={VOCABULARY_RANDOM_WORDS_URL}
                    >
                        100 random words
                    </Button>
                </PageContent>
            </PageWrapper>
        );
    }
}