export interface DefaultMeta {
    readonly message: string;
}

// tslint:disable-next-line:no-any
export const getObjectId = (obj: any) => {
    if (!obj) {
        return null;
    }

    return obj.id || obj._id;
};