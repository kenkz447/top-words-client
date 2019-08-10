import { RouteInfo } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { SPEAK_KINDERGATEN_URL, SPEAK_URL } from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';

import { ConversationTopicGroupsFetcher } from './containers';

export class SpeakHome extends BasePageComponent<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: SPEAK_URL,
        title: 'Speak',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {

        return (
            <PageWrapper>
                <PageHeader
                    subTitle="Speak"
                    subTitleColor="success"
                    description="Speaking is easy"
                    defaultBackUrl="/"
                />
                <PageContent className="container-small">
                    <div>
                        <Button
                            color="success"
                            className="btn-round"
                            outline={true}
                            tag={Link}
                            to={SPEAK_KINDERGATEN_URL}
                        >
                            Kindergarten English
                        </Button>
                    </div>
                    <ConversationTopicGroupsFetcher />
                </PageContent>
            </PageWrapper>
        );
    }
}