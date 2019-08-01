import * as React from 'react';
import { RequestParameter, RestfulRender } from 'react-restful';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { LISTEN_WRITING_ARTICLE_URL } from '@/configs';
import { BaseComponent } from '@/domain';
import { Article, articleResources } from '@/restful';
import { replaceRoutePath } from '@/utilities';

interface ArticlePrevNextProps {
    readonly article: Article;
}

export class ArticlePrevNext extends BaseComponent<ArticlePrevNextProps> {

    private readonly defaultParams: RequestParameter[] = [{
        type: 'query',
        parameter: 'topic',
        value: this.props.article.topic
    },
    {
        type: 'query',
        parameter: '_limit',
        value: 1
    }];

    public render() {
        const { routeParams } = this.context;

        const { article } = this.props;

        return (
            <Pagination>
                <RestfulRender
                    resource={articleResources.getAll}
                    parameters={[
                        ...this.defaultParams,
                        {
                            type: 'query',
                            parameter: '_id_lt',
                            value: article.id
                        },

                        {
                            type: 'query',
                            parameter: '_sort',
                            value: 'id,desc'
                        }
                    ]}
                >
                    {(render) => {
                        const { data } = render;

                        const prevArticle = data && data[0];
                        const toPatch = prevArticle && replaceRoutePath(
                            LISTEN_WRITING_ARTICLE_URL,
                            {
                                ...routeParams,
                                articleSlug: prevArticle.slug
                            }
                        );

                        return (
                            <PaginationItem disabled={!toPatch}>
                                <PaginationLink
                                    tag={Link}
                                    replace={true}
                                    to={toPatch}
                                    previous={true}
                                    href="#"
                                />
                            </PaginationItem>
                        );
                    }}
                </RestfulRender>
                <RestfulRender
                    resource={articleResources.getAll}
                    parameters={[
                        ...this.defaultParams,
                        {
                            type: 'query',
                            parameter: '_id_gt',
                            value: article.id
                        },
                        {
                            type: 'query',
                            parameter: '_sort',
                            value: 'id,asc'
                        }
                    ]}
                >
                    {(render) => {
                        const { data } = render;

                        const nextArticle = data && data[0];

                        const toPatch = nextArticle && replaceRoutePath(
                            LISTEN_WRITING_ARTICLE_URL,
                            {
                                ...routeParams,
                                articleSlug: nextArticle.slug
                            }
                        );

                        return (
                            <PaginationItem disabled={!toPatch}>
                                <PaginationLink
                                    tag={Link}
                                    replace={true}
                                    to={toPatch}
                                    next={true}
                                    href="#"
                                />
                            </PaginationItem>
                        );
                    }}
                </RestfulRender>
            </Pagination>
        );
    }
}