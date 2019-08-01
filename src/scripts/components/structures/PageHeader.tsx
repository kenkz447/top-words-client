import * as classNames from 'classnames';
import { RootContext } from 'qoobee';
import * as React from 'react';
import styled from 'styled-components';

import { WithDomainContext } from '@/domain';

const PageHeaderWrapper = styled.header`
    padding: 24px 24px 0 24px;
    margin-bottom: 24px;
    
    .back {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        &-link {
            color: var(--darkgray)!important;
            height: inherit;
            display: block;
            img {
                height: inherit;
                width: auto;
                display: inline-block;
                vertical-align: middle;
                margin-right: 12px;
            }
            .back-link-text {
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
`;

interface PageHeaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    readonly title?: string;
    readonly subTitle?: string;
    readonly subTitleColor?: string;
    readonly description?: string;
    readonly defaultBackUrl?: string;
    readonly backBtnText?: string;
}

export class PageHeader extends React.PureComponent<PageHeaderProps> {
    public static readonly defaultProps = {
        id: 'pageHeader',
        subTitleColor: 'danger'
    };

    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    private readonly renderSubTitle = () => {
        const {
            title,
            subTitle,
            subTitleColor
        } = this.props;

        if (!subTitle) {
            return null;
        }

        return (
            <React.Fragment>
                {title && '-'} <span className={`text-${subTitleColor}`}>{subTitle}</span>
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
            backBtnText,
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
                                    <span className="back-link-text">{backBtnText}</span>
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