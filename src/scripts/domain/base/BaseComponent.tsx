import { RootContext } from 'qoobee';
import * as React from 'react';

import { WithDomainContext } from './Types';

export class BaseComponent<P = {}, S = {}> extends React.PureComponent<P, S> {
    public static readonly contextType = RootContext;
    public readonly context!: WithDomainContext;

    public readonly isSmallDevice = () => this.context.currentBreakpoint === 'sm';
}