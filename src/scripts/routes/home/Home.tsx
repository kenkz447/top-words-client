import { RootContext, RouteInfo, RoutePage } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { LISTEN_WRITING_URL, VOCABULARY_TEST_URL } from '@/configs';
import { AppPageProps, policies, WithDomainContext } from '@/domain';
import { text } from '@/i18n';

export class Home extends RoutePage<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: '/',
        title: 'Home',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    public render() {

        return (
            <PageWrapper>
                <PageHeader
                    title="Top Words"
                    description="Learn English by listening, reading, writing, vocabulary and more."
                />
                <PageContent>
                    <div className="container-small">
                        <Button
                            color="danger"
                            size="large"
                            outline={true}
                            className="mr-2 mb-2 btn-round"
                            tag={Link}
                            to={LISTEN_WRITING_URL}
                        >
                            {text('Listen and Write')}
                        </Button>
                        <Button
                            color="info "
                            outline={true}
                            size="large"
                            className="mb-2 btn-round"
                            tag={Link}
                            to={VOCABULARY_TEST_URL}
                        >
                            {text('Vocabulary test')}
                        </Button>
                    </div>

                </PageContent>
            </PageWrapper>
        );
    }
}