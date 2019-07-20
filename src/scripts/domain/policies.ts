import { Policy } from 'qoobee';

import { WithDomainContext } from './base';

export const locationAllowed: Policy = (context: WithDomainContext) => {
    return true;
};

export const functionAllowed: Policy = (context: WithDomainContext, funcKey: string) => {
    return true;
};