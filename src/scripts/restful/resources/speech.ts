import { Resource } from 'react-restful';

export const speechResources = {
    getSpeech: new Resource<any, Response>({
        url: '/speech'
    })
};