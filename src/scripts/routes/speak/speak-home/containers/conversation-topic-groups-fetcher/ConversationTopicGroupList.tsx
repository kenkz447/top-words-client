import * as React from 'react';
import { Link } from 'react-router-dom';

import { ConversationTopicGroup } from '@/restful';

interface ConversationTopicGroupListProps {
    readonly conversationTopicGroup: ConversationTopicGroup[];
}

export class ConversationTopicGroupList extends React.PureComponent<ConversationTopicGroupListProps> {

    private readonly renderGroupByLevel = (level: ConversationTopicGroup['level']) => {
        const { conversationTopicGroup } = this.props;
        const groupsByLevel = conversationTopicGroup.filter(o => o.level === level);

        return (
            <div>
                <h4 className="mb-2">
                    <span className="first-char-capitalize">
                        {level}
                    </span>
                </h4>
                <ul>
                    {groupsByLevel.map(group => {
                        return (
                            <li key={group.id}>
                                <Link to="/">
                                    {group.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    public render() {
        return (
            <div>
                {this.renderGroupByLevel('beginner')}
                {this.renderGroupByLevel('intermediate')}
            </div>
        );
    }
}
