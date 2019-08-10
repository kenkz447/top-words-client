import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { LISTEN_WRITING_URL, SPEAK_URL, VOCABULARY_URL } from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';
import { text } from '@/i18n';

export class Home extends BasePageComponent<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: '/',
        title: 'Home',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {

        return (
            <PageWrapper>
                <PageHeader
                    title="Top Words"
                    description="Learn English by listening, reading, writing, vocabulary and more."
                />
                <PageContent>
                    <div className="scroll-horizontal">
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
                            color="success"
                            size="large"
                            outline={true}
                            className="mr-2 mb-2 btn-round"
                            tag={Link}
                            to={SPEAK_URL}
                        >
                            {text('Speak')}
                        </Button>
                        <Button
                            color="info "
                            outline={true}
                            size="large"
                            className="mb-2 btn-round"
                            tag={Link}
                            to={VOCABULARY_URL}
                        >
                            {text('Vocabulary')}
                        </Button>
                    </div>
                </PageContent>
            </PageWrapper>
        );
    }
}