import * as React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';

import { SlideUp } from '@/components';
import { LISTEN_WRITING_ARTICLE_URL } from '@/configs';
import { Article } from '@/restful';
import { replaceRoutePath } from '@/utilities';

const ArticleListWrapper = styled.div`
    flex-grow: 1;
`;

interface ArticleListProps {
    readonly topicSlug: string;
    readonly className?: string;
    readonly articles: Article[];
    readonly loading: boolean;
}

export class ArticleList extends React.Component<ArticleListProps> {
    public static readonly defaultProps = {
        loading: false,
        articles: []
    };

    public render() {
        const { articles, className, topicSlug } = this.props;

        return (
            <ArticleListWrapper className={className}>
                <SlideUp>
                    <ListGroup>
                        {
                            articles.map(article => {
                                const to = replaceRoutePath(
                                    LISTEN_WRITING_ARTICLE_URL,
                                    {
                                        topicSlug: topicSlug,
                                        articleSlug: article.slug
                                    }
                                );

                                return (
                                    <ListGroupItem
                                        key={article.id}
                                        tag={Link}
                                        to={to}
                                        action={true}
                                    >
                                        {article.name}
                                    </ListGroupItem>
                                );
                            })
                        }
                    </ListGroup>
                </SlideUp>
            </ArticleListWrapper>
        );
    }
}