import * as React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';

import { Loading, SlideUp } from '@/components';
import { LISTEN_WRITING_TOPIC_URL } from '@/configs';
import { Topic } from '@/restful';
import { replaceRoutePath } from '@/utilities';

const TopicListWrapper = styled.div`
    display: block;
`;

interface TopicListProps {
    readonly topics: Topic[];
    readonly loading: boolean;
}

export class TopicList extends React.Component<TopicListProps> {
    public static readonly defaultProps: TopicListProps = {
        loading: false,
        topics: []
    };

    public render() {
        const { topics, loading } = this.props;

        if (loading) {
            return (
                <Loading />
            );
        }

        return (
            <TopicListWrapper>
                <SlideUp>
                    <ListGroup>
                        {
                            topics.map(topic => {
                                return (
                                    <ListGroupItem
                                        key={topic.id}
                                        tag={Link}
                                        to={replaceRoutePath(LISTEN_WRITING_TOPIC_URL, { topicSlug: topic.slug })}
                                        action={true}
                                    >
                                        {topic.name}
                                    </ListGroupItem>
                                );
                            })
                        }
                    </ListGroup>
                </SlideUp>
            </TopicListWrapper>
        );
    }
}