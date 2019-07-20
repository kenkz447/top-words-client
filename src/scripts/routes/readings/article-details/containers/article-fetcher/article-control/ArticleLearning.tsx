import * as React from 'react';
import { Input } from 'reactstrap';

import { text } from '@/i18n';
import { Article } from '@/restful';

interface ArticleLearningProps {
    readonly article: Article;
}

interface ArticleLearningState {
    readonly showError: boolean;
}

export class ArticleLearning extends React.PureComponent<ArticleLearningProps, ArticleLearningState> {

    constructor(props: ArticleLearningProps) {
        super(props);

        this.state = {
            showError: false
        };
    }

    private readonly onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState({
            showError: true
        });

        setTimeout(() => {
            this.setState({
                showError: false
            });
        }, 50);
    }

    public render() {
        const { article } = this.props;
        const { showError } = this.state;

        return (
            <div className="container-small mb-4">
                <form onSubmit={this.onSubmit}>
                    <Input
                        placeholder={text('Input your answer...')}
                        autoFocus={true}
                        invalid={showError}
                    />
                    <input className="display-none" type="submit" />
                </form>
            </div>
        );
    }
}
