export type NormalizedObject<T> = {
    byId: {
        [key: number]: T;
    };
    all: number[];
}

export type ByIdObject<T> = {
    [key: number]: T;
}

export type AsyncAction<T> = {
    payload: T
}