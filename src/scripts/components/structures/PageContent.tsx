import * as React from 'react';
import styled from 'styled-components';

const PageContentWrapper = styled.main`
    min-height: inherit;
    padding: 0 24px 24px 24px;
    margin-top: 24px;
`;

interface PageContentProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
}

export class PageContent extends React.PureComponent<PageContentProps> {
    public static readonly defaultProps = {
        id: 'pageContent'
    };

    public render() {
        const { ...rest } = this.props;

        return (
            <PageContentWrapper
                {...rest}
            >
                {this.props.children}
            </PageContentWrapper>
        );
    }
}