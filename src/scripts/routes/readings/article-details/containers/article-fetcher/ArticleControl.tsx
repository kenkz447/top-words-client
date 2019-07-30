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
    ArticleVocabulary
} from './article-control';

interface ArticleControlProps {
    readonly article: Article;
}

interface ArticleControlState {
    readonly isLearning: boolean;
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

    public render() {
        const { article } = this.props;

        const { isLearning, activeTab } = this.state;

        return (
            <div>
                <ArticleHeader article={article} />
                {
                    isLearning ? (
                        <SlideUp>
                            <ArticleLearning
                                content={article!.content}
                                onCompleted={() => this.setState({ isLearning: false })}
                                onStop={() => this.setState({ isLearning: false })}
                            />
                        </SlideUp>
                    )
                        : (
                            <SlideUp className=" container-medium ">
                                <div className="mb-4">
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
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <Button
                                            id="startLearning"
                                            color="danger"
                                            disabled={!article}
                                            onClick={() => this.setState({ isLearning: true })}
                                        >
                                            {text('Start')} <i className="nc-icon nc-button-play" />
                                        </Button>
                                    </div>
                                    <div>
                                        <ArticlePrevNext article={article} />
                                    </div>
                                </div>
                            </SlideUp>
                        )
                }
            </div>
        );
    }
}
