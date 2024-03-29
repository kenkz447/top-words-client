import * as classNames from 'classnames';
import * as React from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    Progress
} from 'reactstrap';
import styled from 'styled-components';

import { text } from '@/i18n';

import { ArticleLearningBase } from './article-learning';

const ArticleVocabularyLearningWrapper = styled.div`
    display: block;
`;

interface ArticleVocabularyLearningProps {
}

export class ArticleVocabularyLearning extends ArticleLearningBase<ArticleVocabularyLearningProps> {

    public render() {
        const { onStop, contentTranslated } = this.props;
        const { inputState, currentInputValue, hint, currentContentIndex, processPercent } = this.state;

        return (
            <ArticleVocabularyLearningWrapper className="container-small">
                {contentTranslated && (
                    <div className="mb-4">
                        <p className="text-monospace">
                            vi: <span className="first-char-capitalize">{contentTranslated[currentContentIndex]}</span>
                        </p>
                    </div>
                )}
                <Form className="mb-4" onSubmit={this.onSubmit}>
                    <FormGroup className={classNames({ 'has-danger': inputState === 'error' })}>
                        <Label for="learnningInput">
                            {
                                hint
                                    ? <span className="text-danger"> ... {hint}</span>
                                    : text('Press ENTER to show hint!')
                            }
                        </Label>
                        <InputGroup
                            className={inputState === 'success' ? 'has-success' : ''}
                        >
                            <Input
                                id="learnningInput"
                                placeholder={text('Input your answer...')}
                                autoFocus={true}
                                className={inputState === 'success' ? 'forn-control-success' : ''}
                                onKeyUp={this.onInputKeyUp}
                                onKeyDown={this.onInputKeyDown}
                                value={currentInputValue}
                                onChange={this.onInputChange}
                            />
                            <InputGroupAddon addonType="append">
                                <Button
                                    id="goToNextWordBtn"
                                    color={inputState === 'success' ? 'success' : 'danger'}
                                    onClick={this.onGotoNextWordClick}
                                >
                                    <i className="nc-icon nc-user-run" />
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <input className="display-none" type="submit" />
                </Form>
                <div className="mb-4">
                    <Progress className="progress-bar-striped" value={processPercent} />
                </div>
                <div className="d-flex">
                    <div className="mr-4">
                        <Button
                            id="startLearning"
                            color="danger"
                            onClick={onStop}
                        >
                            <i className="nc-icon nc-minimal-left" /> {text('Stop')}
                        </Button>
                    </div>
                </div>
            </ArticleVocabularyLearningWrapper>
        );
    }
}
