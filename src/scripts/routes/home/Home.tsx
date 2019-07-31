import { RootContext, RouteInfo, RoutePage } from 'qoobee';
import * as React from 'react';
import { Button } from 'reactstrap';

import { PageContent, PageHeader, PageWrapper } from '@/components';
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
        const { history } = this.context;

        return (
            <PageWrapper>
                <PageHeader
                    title="Top Words"
                    description="Learn English by listening, reading, writing, vocabulary and more."
                />
                <PageContent>
                    <Button
                        color="danger"
                        size="large"
                        outline={true}
                        className="mr-2"
                        onClick={() => history.push('/readings')}
                    >
                        {text('Readings')}
                    </Button>
                </PageContent>
            </PageWrapper>
        );
    }
}