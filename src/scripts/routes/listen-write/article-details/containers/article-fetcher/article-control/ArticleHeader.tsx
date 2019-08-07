import * as React from 'react';
import styled from 'styled-components';

import { HighlightTitle } from '@/components/styled';
import { text } from '@/i18n';
import { Article } from '@/restful';

const ArticleHeaderWrapper = styled.article`
    display: block;
`;

interface ArticleHeaderProps {
    readonly article: Article;
}

export class ArticleHeader extends React.PureComponent<ArticleHeaderProps> {
    public render() {
        const { article } = this.props;

        return (
            <ArticleHeaderWrapper>
                <span className="text-muted">{text('Article')}</span>
                <HighlightTitle className="mt-2 mb-4 h4">
                    {article ? article.name : '{...}'}
                </HighlightTitle>
            </ArticleHeaderWrapper>
        );
    }
}
