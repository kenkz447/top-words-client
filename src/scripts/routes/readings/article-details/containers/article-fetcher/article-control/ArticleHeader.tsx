import * as React from 'react';
import styled from 'styled-components';

import { text } from '@/i18n';
import { Article } from '@/restful';

const ArticleHeaderWrapper = styled.article`
    margin-bottom: 24px;
`;

interface ArticleHeaderProps {
    readonly article: Article;
}

export class ArticleHeader extends React.PureComponent<ArticleHeaderProps> {
    public render() {
        const { article } = this.props;

        return (
            <ArticleHeaderWrapper>
                <h4 className="mb-3">
                    <span className="text-muted">{text('Article')}: </span> {article ? article.name : '{...}'}
                </h4>
            </ArticleHeaderWrapper>
        );
    }
}
