import * as React from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';

import { Article } from '@/restful';

const ArticleVocabularyWrapper = styled.div`
    .table > thead > tr > th {
        border-top: 0;
        padding-top: 0;
    }
`;

interface ArticleVocabularyProps {
    readonly article: Article;
}

export class ArticleVocabulary extends React.PureComponent<ArticleVocabularyProps> {
    public render() {
        const { article } = this.props;

        return (
            <ArticleVocabularyWrapper className="mb-4">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Word</th>
                            <th>Meaning(vi)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {article.vocabularies.map((vocabulary, index) => {
                            return (
                                <tr key={vocabulary.id}>
                                    <td>{index}</td>
                                    <td className="text-capitalize">{vocabulary.name}</td>
                                    <td>{vocabulary.translate_vi}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </ArticleVocabularyWrapper>
        );
    }
}
