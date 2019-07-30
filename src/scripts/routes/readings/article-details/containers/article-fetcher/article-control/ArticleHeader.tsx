import * as React from 'react';
import styled from 'styled-components';

import { text } from '@/i18n';
import { Article } from '@/restful';

const ArticleHeaderWrapper = styled.article`
    .article-name::after {
        content: " ";
        display: block;
        width: 75px;
        height: 3px;
        background: var(--danger);
        margin-top: 6px;
    }
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
                <h4 className="mt-2 mb-3 article-name">
                    {article ? article.name : '{...}'}
                </h4>
            </ArticleHeaderWrapper>
        );
    }
}
