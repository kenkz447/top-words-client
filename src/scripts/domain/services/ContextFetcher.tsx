import { RootContext } from 'qoobee';
import * as React from 'react';

export class ContextFetcher extends React.PureComponent {
    public static readonly contextType = RootContext;

    private readonly fetchContext = async () => {
        //
    }

    public componentDidMount() {
        this.fetchContext();
    }

    public render() {
        return null;
    }
}