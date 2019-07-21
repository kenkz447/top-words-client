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
            cursor: pointer;
        }
    }
`;

interface PageHeaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    readonly subTitle?: string;
    readonly description?: string;
    readonly defaultBackUrl?: string;
}

export class PageHeader extends React.PureComponent<PageHeaderProps> {
    public static readonly defaultProps = {
        id: 'pageHeader',
        description: 'Learn English by listening, reading, writing, vocabulary and more.'
    };

    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    private readonly renderSubTitle = () => {
        const {
            subTitle,
            description,
            defaultBackUrl,
            ...rest
        } = this.props;

        if (!subTitle) {
            return null;
        }

        return (
            <React.Fragment>
                &nbsp;- <span className="text-danger">{subTitle}</span>
            </React.Fragment>
        );
    }

    public render() {
        const { history, currentBreakpoint } = this.context;

        const {
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
                            defaultBackUrl !== '' ? (
                                <Link className="back-link" to={defaultBackUrl}>
                                    <span>{text('Back')}</span>
                                </Link>
                            )
                                : (
                                    <a className="back-link" onClick={() => history.goBack()}>
                                        <span>
                                            {text('Back')}
                                        </span>
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
                        Top Words {this.renderSubTitle()}
                    </h1>
                    <p>{description}</p>
                </div>
            </PageHeaderWrapper >
        );
    }
}