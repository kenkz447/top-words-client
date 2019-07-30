import * as React from 'react';

import { Article } from '@/restful';
import { splitContentByNewline } from '@/utilities';

interface ArticleClozeProps {
    readonly article: Article;
}

export class ArticleCloze extends React.PureComponent<ArticleClozeProps> {
    public render() {
        const { article } = this.props;

        const textContents = splitContentByNewline(article.cloze!);

        return (
            <div>
                {
                    textContents.map((textContent, index) => (
                        <p
                            key={index}
                            className="text-justify font-size-large"
                        >
                            {textContent}
                        </p>
                    ))
                }
            </div>
        );
    }
}
