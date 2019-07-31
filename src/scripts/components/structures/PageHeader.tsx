import * as classNames from 'classnames';
import { RootContext } from 'qoobee';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { WithDomainContext } from '@/domain';
import { text } from '@/i18n';

const PageHeaderWrapper = styled.header`
    padding: 24px 24px 0 24px;
    margin-bottom: 24px;
    
    .back {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        &-link {
            color: var(--info)!important;
            height: inherit;
            img {
                height: inherit;
                width: auto;
            }
        }
    }
`;

interface PageHeaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    readonly title?: string;
    readonly subTitle?: string;
    readonly description?: string;
    readonly defaultBackUrl?: string;
}

export class PageHeader extends React.PureComponent<PageHeaderProps> {
    public static readonly defaultProps = {
        id: 'pageHeader'
    };

    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    private readonly renderSubTitle = () => {
        const {
            subTitle
        } = this.props;

        if (!subTitle) {
            return null;
        }

        return (
            <React.Fragment>
                - <span className="text-danger">{subTitle}</span>
            </React.Fragment>
        );
    }

    private readonly onClackClick = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const { history } = this.context;

        const { defaultBackUrl } = this.props;

        if (history.length > 0) {
            return history.goBack();
        }

        if (!defaultBackUrl) {
            return;
        }

        history.push(defaultBackUrl);
    }

    public render() {
        const { currentBreakpoint } = this.context;

        const {
            title,
            subTitle,
            description,
            defaultBackUrl,
            ...rest
        } = this.props;

        return (
            <PageHeaderWrapper {...rest}>
                <div className="back">
                    {
                        defaultBackUrl !== undefined && (
                            !!defaultBackUrl && (
                                <a
                                    className="back-link"
                                    href={defaultBackUrl}
                                    onClick={this.onClackClick}
                                >
                                    <img alt="back-icon" src="/static/assets/icon-back.svg" />
                                </a>
                            )
                        )
                    }
                </div>
                <div>
                    <h1
                        className={classNames({
                            h2: true,
                            h3: currentBreakpoint === 'sm'
                        })}
                    >
                        {title} {this.renderSubTitle()}
                    </h1>
                    <p>{description}</p>
                </div>
            </PageHeaderWrapper >
        );
    }
}