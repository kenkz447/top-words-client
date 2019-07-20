import './DefaultLayout.scss';

import * as React from 'react';

interface DefaultLayoutProps {
}

interface DefaultLayoutState {
    readonly siderCollapsed: boolean;
}

export class DefaultLayout extends React.PureComponent<DefaultLayoutProps, DefaultLayoutState> {
    constructor(props: DefaultLayoutProps) {
        super(props);
    }

    public render() {
        return (
            <div {...this.props}/>
        );
    }
}