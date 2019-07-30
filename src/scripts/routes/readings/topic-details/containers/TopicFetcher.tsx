import * as React from 'react';
import { RestfulRender } from 'react-restful';

import { topicResources } from '@/restful';

interface TopicFetcherProps {
    readonly topicSlug: string;
}

export class TopicFetcher extends React.PureComponent<TopicFetcherProps> {
    public render() {
        const { topicSlug } = this.props;

        return (
            <RestfulRender
                resource={topicResources.getAll}
                parameters={{
                    type: 'query',
                    parameter: 'slug',
                    value: topicSlug
                }}
            >
                {({ data, fetching }) => {
                    return (
                        <div>
                            <span className="text-muted"> Topic </span>
                            <h2 className="mt-2 mb-3 h4"> {data ? data[0].name : '{...}'}</h2>
                        </div>
                    );
                }}
            </RestfulRender>
        );
    }
}
