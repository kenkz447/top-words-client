import { RouteInfo } from 'qoobee';
import * as React from 'react';

import { PageContent, PageHeader, PageWrapper } from '@/components';
import { HighlightTitle } from '@/components/styled';
import { SPEAK_KINDERGATEN_URL, SPEAK_URL } from '@/configs';
import { AppPageProps, BasePageComponent, policies } from '@/domain';
import { text } from '@/i18n';

import { SpeakKindergatenControl } from './containers';

export class SpeakKindergaten extends BasePageComponent<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: SPEAK_KINDERGATEN_URL,
        title: 'Speak Kindergaten English',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public render() {

        return (
            <PageWrapper>
                <PageHeader
                    defaultBackUrl={SPEAK_URL}
                />
                <PageContent>
                    <div className=" mb-4 ">
                        <span className="text-muted">{text('Conversation')}</span>
                        <HighlightTitle className="mt-2 h4 mb-4" color="success">
                            Speak Kindergaten English
                        </HighlightTitle>
                    </div>
                    
                    <SpeakKindergatenControl />
                </PageContent>
            </PageWrapper>
        );
    }
}