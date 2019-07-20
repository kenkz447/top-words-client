import {
    BreakpointDetector,
    ErrorLogger,
    I18NLoader,
    render,
    RootProps
} from 'qoobee';
import * as React from 'react';

import * as Sentry from '@sentry/browser';

import { ErrorPage } from './components';
import { defaultLanguage } from './configs';
import { ContextFetcher, GlobalModal, Notifications, policies } from './domain';
import { showAction } from './effects';
import { RouterRoot } from './routes';

const AppContent = () => (
    <ErrorLogger
        ErrorPage={ErrorPage}
        setup={() => {
            Sentry.init({
                dsn: 'https://025958a33b0f4f00803533fb31956730@sentry.io/1404850',
                environment: SUB_ENV
            });
            Sentry.configureScope((scope) => {
                scope.setExtra('versionHash', '$Id$');
            });
        }}
        onError={({ error, errorInfo }) => {
            Sentry.withScope(scope => {
                if (errorInfo) {
                    Object.keys(errorInfo).forEach(key => {
                        scope.setExtra(key, errorInfo[key]);
                    });
                }
                Sentry.captureException(error);
            });
        }}
    >
        <Notifications />
        <ContextFetcher />
        <BreakpointDetector />
        <I18NLoader>
            <RouterRoot />
        </I18NLoader>
        <GlobalModal />
    </ErrorLogger>
);

const rootProps: RootProps = {
    AppContent: AppContent,
    initialContext: {
        policies: policies,
        currentLanguage: localStorage.getItem('lang') || defaultLanguage
    },
    SWRegistrationProps:
        process.env.NODE_ENV === 'production'
            ? {
                onUpdateFound: function () {
                    const sw = this.installing!;
                    sw.onstatechange = () => {
                        if (
                            sw.state !== 'installed' ||
                            !navigator.serviceWorker.controller
                        ) {
                            return;
                        }

                        showAction({
                            message: 'Nội dung mới khả dụng, tải lại trang để cập nhật phiên bản mới nhất?',
                            actionLabel: 'Tải lại trang',
                            onClick: () => location.reload(true)
                        });
                    };
                }
            }
            : undefined
};

export const startup = (rootElement: HTMLElement | null) => {
    if (!rootElement) {
        return null;
    }

    render(rootElement, rootProps);
};