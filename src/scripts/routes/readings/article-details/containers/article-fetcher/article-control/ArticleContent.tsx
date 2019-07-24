import * as React from 'react';
import styled from 'styled-components';

import { Loading } from '@/components';
import { text } from '@/i18n';
import { Article } from '@/restful';

const ArticleContentWrapper = styled.article`
    margin-bottom: 24px;
`;

interface ArticleContentProps {
    readonly article: Article | null;
}

export class ArticleContent extends React.PureComponent<ArticleContentProps> {
    public render() {
        const { article } = this.props;

        if (!article) {
            return (
                <ArticleContentWrapper>
                    <Loading />
                </ArticleContentWrapper>
            );
        }

        return (
            <ArticleContentWrapper>
                <p className="text-justify container-medium font-size-large">
                    {article.content_EN}
                </p>
            </ArticleContentWrapper>
        );
    }
}
