import * as React from 'react';

import { Article } from '@/restful';
import { splitContentByNewline } from '@/utilities';

interface ArticleContentProps {
    readonly article: Article;
}

export class ArticleContent extends React.PureComponent<ArticleContentProps> {

    public render() {
        const { article } = this.props;
        const textContents = splitContentByNewline(article.content);

        return (
            <div>
                {
                    textContents.map((textContent, index) => (
                        <p
                            key={index}
                            className="text-justify font-size-large"
                            dangerouslySetInnerHTML={{ __html: textContent }}
                        />
                    ))
                }
            </div>
        );
    }
}
