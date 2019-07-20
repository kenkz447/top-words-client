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

    public render() {
        const { history } = this.context;

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
                    <h2>Top Words
                    {
                            subTitle !== undefined && (
                                <React.Fragment>
                                    &nbsp;- <span className="text-danger">{subTitle}</span>
                                </React.Fragment>
                            )
                        }
                    </h2>
                    <p>{description}</p>
                </div>
            </PageHeaderWrapper>
        );
    }
}