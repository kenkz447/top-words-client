import * as classNames from 'classnames';
import * as React from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label
} from 'reactstrap';
import styled from 'styled-components';

import { text } from '@/i18n';

import { ArticleLearningBase } from './article-learning';

const ArticleLearningWrapper = styled.div`
    #goToNextWordBtn {
        padding: 0;
        font-size: 21px;
        width: 50px;
    }
`;

interface ArticleLearningProps {
    readonly onStop: () => void;
}

export class ArticleLearning extends ArticleLearningBase<ArticleLearningProps> {

    public render() {
        const { onStop } = this.props;
        const { inputState, currentInputValue, hint } = this.state;

        return (
            <ArticleLearningWrapper className="container-small">
                <Form className="mb-4" onSubmit={this.onSubmit}>
                    <FormGroup className={classNames({ 'has-danger': inputState === 'error' })}>
                        <Label for="learnningInput">
                            {
                                hint
                                    ? <span className="text-danger"> ... {hint}</span>
                                    : text('Hold SHIFT and press ENTER to use cheat!')
                            }
                        </Label>
                        <InputGroup>
                            <Input
                                id="learnningInput"
                                placeholder={text('Input your answer...')}
                                autoFocus={true}
                                valid={inputState === 'success'}
                                onKeyUp={this.onInputKeyUp}
                                onKeyDown={this.onInputKeyDown}
                                value={currentInputValue}
                                onChange={this.onInputChange}
                            />
                            <InputGroupAddon addonType="append">
                                <Button
                                    id="goToNextWordBtn"
                                    color="danger"
                                    onClick={this.onGotoNextWordClick}
                                >
                                    <i className="nc-icon nc-user-run" />
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                    <input className="display-none" type="submit" />
                </Form>
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
            </ArticleLearningWrapper>
        );
    }
}
