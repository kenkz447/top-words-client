import * as React from 'react';
import { RestfulRender } from 'react-restful';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { READINGS_ARTICLE_URL } from '@/configs';
import { BaseComponent } from '@/domain';
import { Article, articleResources } from '@/restful';
import { replaceRoutePath } from '@/utilities';

interface ArticlePrevNextProps {
    readonly article: Article | null;
}

export class ArticlePrevNext extends BaseComponent<ArticlePrevNextProps> {
    public render() {
        const { routeParams } = this.context;

        const { article } = this.props;
        if (!article) {
            return null;
        }

        return (
            <RestfulRender
                resource={articleResources.getNextAndPrev}
                parameters={{
                    type: 'path',
                    parameter: 'id',
                    value: article.id
                }}
            >
                {(render) => {
                    const { data } = render;

                    const prevPath = data && replaceRoutePath(
                        READINGS_ARTICLE_URL,
                        {
                            ...routeParams,
                            articleSlug: data.prev.slug
                        }
                    );

                    const nextPath = data && replaceRoutePath(
                        READINGS_ARTICLE_URL,
                        {
                            ...routeParams,
                            articleSlug: data.next.slug
                        }
                    );

                    return (
                        <Pagination>
                            <PaginationItem disabled={!data || !data.prev}>
                                <PaginationLink
                                    tag={Link}
                                    replace={true}
                                    to={prevPath}
                                    previous={true}
                                    href="#"
                                />
                            </PaginationItem>
                            <PaginationItem disabled={!data || !data.next}>
                                <PaginationLink
                                    tag={Link}
                                    replace={true}
                                    to={nextPath}
                                    next={true}
                                    href="#"
                                />
                            </PaginationItem>
                        </Pagination>
                    )
                }}
            </RestfulRender>
        );
    }
}
