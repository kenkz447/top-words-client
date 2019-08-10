import { RootContext, RouteInfo, RoutePage } from 'qoobee';
import * as React from 'react';

import { PageContent, PageHeader, PageWrapper, SlideUp } from '@/components';
import { HighlightTitle } from '@/components/styled';
import { VOCABULARY_RANDOM_WORDS_URL, VOCABULARY_URL } from '@/configs';
import { AppPageProps, policies, WithDomainContext } from '@/domain';
import { text } from '@/i18n';

import { RandomWordsControl } from './containers';

export class VocabularyRandomWords extends RoutePage<AppPageProps> {
    public static readonly routeInfo: RouteInfo = {
        path: VOCABULARY_RANDOM_WORDS_URL,
        title: 'Random Words',
        exact: true,
        policies: [policies.locationAllowed]
    };

    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    public render() {

        return (
            <PageWrapper>
                <PageHeader
                    defaultBackUrl={VOCABULARY_URL}
                />
                <PageContent>
                    <div className=" mb-4 ">
                        <span className="text-muted">{text('Game')}</span>
                        <HighlightTitle className="mt-2 h4 mb-4" color="info">
                            100 random words
                        </HighlightTitle>
                    </div>
                    <SlideUp className="container-small">
                        <RandomWordsControl />
                    </SlideUp>
                </PageContent>
            </PageWrapper>
        );
    }
}