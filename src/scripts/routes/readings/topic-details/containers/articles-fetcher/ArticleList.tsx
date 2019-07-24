import * as React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';

import { SlideUp } from '@/components';
import { READINGS_ARTICLE_URL } from '@/configs';
import { Article } from '@/restful';
import { replaceRoutePath } from '@/utilities';

const ArticleListWrapper = styled.div`
    flex-grow: 1;
`;

interface ArticleListProps {
    readonly className?: string;
    readonly articles: Article[];
    readonly loading: boolean;
}

export class ArticleList extends React.Component<ArticleListProps> {
    public static readonly defaultProps: ArticleListProps = {
        loading: false,
        articles: []
    };

    public render() {
        const { articles, className } = this.props;

        return (
            <ArticleListWrapper className={className}>
                <SlideUp>
                    <ListGroup>
                        {
                            articles.map(article => {
                                return (
                                    <ListGroupItem
                                        key={article.id}
                                        tag={Link}
                                        to={replaceRoutePath(READINGS_ARTICLE_URL, article)}
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