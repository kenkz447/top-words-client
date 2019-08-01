import * as React from 'react';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import { SlideUp } from '@/components';
import { BaseComponent } from '@/domain';
import { text } from '@/i18n';
import { Article } from '@/restful';

import {
    ArticleContent,
    ArticleHeader,
    ArticleLearning,
    ArticlePrevNext,
    ArticleVocabulary,
    ArticleVocabularyLearning
} from './article-control';

interface ArticleControlProps {
    readonly article: Article;
}

interface ArticleControlState {
    readonly isLearning: boolean;
    readonly learningModel?: 'vocabulary' | 'writing';
    readonly activeTab: string;
}

export class ArticleControl extends BaseComponent<ArticleControlProps, ArticleControlState> {

    constructor(props: ArticleControlProps) {
        super(props);

        this.state = {
            isLearning: false,
            activeTab: 'reading'
        };
    }

    private readonly toggleLearning = (learningModel?: ArticleControlState['learningModel']) => {
        const { isLearning } = this.state;
        if (isLearning) {
            this.setState({
                isLearning: false
            });

            return;
        }

        this.setState({
            isLearning: true,
            learningModel: learningModel
        });
    }

    private readonly renderLearningContent = (learningModel?: ArticleControlState['learningModel']) => {
        const { article } = this.props;

        switch (learningModel) {
            case 'vocabulary':
                return (
                    <ArticleVocabularyLearning
                        showHintOnSubmit={true}
                        content={article.vocabularies.map(o => o.name)}
                        contentTranslated={article.vocabularies.map(o => o.translate_vi)}
                        onCompleted={() => this.toggleLearning()}
                        onStop={() => this.toggleLearning()}
                    />
                );
            case 'writing':
            default:
                return (
                    <ArticleLearning
                        content={article!.content}
                        onCompleted={() => this.toggleLearning()}
                        onStop={() => this.toggleLearning()}
                    />
                );
        }
    }

    public render() {
        const { article } = this.props;

        const { isLearning, activeTab, learningModel } = this.state;

        return (
            <div>
                <ArticleHeader article={article} />
                {
                    isLearning ? (
                        <SlideUp>
                            {this.renderLearningContent(learningModel)}
                        </SlideUp>
                    )
                        : (
                            <SlideUp className="container-medium">
                                <div className="mb-4">
                                    <div className="mb-4">
                                        <Button
                                            id="learnVocabularyBtn"
                                            color="danger"
                                            className="mr-2"
                                            outline={true}
                                            disabled={!article}
                                            onClick={() => this.toggleLearning('vocabulary')}
                                        >
                                            {text('Learn vocabulary')}
                                        </Button>
                                        <Button
                                            id="startLearningBtn"
                                            color="danger"
                                            disabled={!article}
                                            onClick={() => this.toggleLearning('writing')}
                                        >
                                            {text('Start writing')} <i className="nc-icon nc-button-play" />
                                        </Button>
                                    </div>
                                    <div className="nav-tabs-navigation mb-4">
                                        <div className="nav-tabs-wrapper">
                                            <Nav tabs={true}>
                                                <NavItem>
                                                    <NavLink
                                                        className={
                                                            this.classNames(
                                                                'pl-0',
                                                                { active: activeTab === 'vocabulary' })
                                                        }
                                                        onClick={() => this.setState({ activeTab: 'vocabulary' })}
                                                    >
                                                        Vocabulary
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={this.classNames({ active: activeTab === 'reading' })}
                                                        onClick={() => this.setState({ activeTab: 'reading' })}
                                                    >
                                                        Reading
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </div>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="vocabulary">
                                            <ArticleVocabulary article={article} />
                                        </TabPane>
                                        <TabPane tabId="reading">
                                            <ArticleContent article={article} />
                                        </TabPane>
                                    </TabContent>
                                </div>
                                <div className="border-top border-top-dashed pt-4">
                                    <ArticlePrevNext article={article} />
                                </div>
                            </SlideUp>
                        )
                }
            </div>
        );
    }
}
