import * as React from 'react';
import styled from 'styled-components';

import { Loading } from '@/components';
import { Article } from '@/restful';

const ArticleContentWrapper = styled.article`
    margin-bottom: 24px;
`;

interface ArticleContentProps {
    readonly article: Article | null;
}

export class ArticleContent extends React.PureComponent<ArticleContentProps> {

    private readonly getContext = () => {
        const { article } = this.props;

        return article!.content.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }

    public render() {
        const { article } = this.props;

        if (!article) {
            return (
                <ArticleContentWrapper>
                    <Loading />
                </ArticleContentWrapper>
            );
        }

        const textContent = this.getContext();

        return (
            <ArticleContentWrapper>
                <p
                    className="text-justify font-size-large"
                    dangerouslySetInnerHTML={{ __html: textContent }}
                />
            </ArticleContentWrapper>
        );
    }
}
