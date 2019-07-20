import { Role } from 'qoobee';

import { permissions } from './permissions';

const admin: Role = {
    key: 'Admin',
    defaultUrl: '/',
    allowed: [
        permissions.ALL
    ]
};

export const roles = [
    admin
];