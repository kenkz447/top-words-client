import * as React from 'react';
import { RestfulRender } from 'react-restful';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { READINGS_ARTICLE_URL } from '@/configs';
import { Article, articleResources } from '@/restful';
import { replaceRoutePath } from '@/utilities';

interface ArticlePrevNextProps {
    readonly article: Article | null;
}

export class ArticlePrevNext extends React.PureComponent<ArticlePrevNextProps> {
    public render() {
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

                    return (
                        <Pagination>
                            <PaginationItem disabled={!data || !data.prev}>
                                <PaginationLink
                                    tag={Link}
                                    replace={true}
                                    to={data && replaceRoutePath(READINGS_ARTICLE_URL, data.prev)}
                                    previous={true}
                                    href="#"
                                />
                            </PaginationItem>
                            <PaginationItem disabled={!data || !data.next}>
                                <PaginationLink
                                    tag={Link}
                                    replace={true}
                                    to={data && replaceRoutePath(READINGS_ARTICLE_URL, data.next)}
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
