import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { topicResources } from './node_modules/@/restful';

interface TopicFetcherProps {
    readonly topicId: number;
}

export class TopicFetcher extends React.PureComponent<TopicFetcherProps> {
    public render() {
        const { topicId } = this.props;

        return (
            <RestfulRender
                resource={topicResources.getOne}
                parameters={{
                    type: 'path',
                    parameter: 'id',
                    value: topicId
                }}
            >
                {({ data, fetching }) => {
                    return (
                        null
                    );
                }}
            </RestfulRender>
        );
    }
}
