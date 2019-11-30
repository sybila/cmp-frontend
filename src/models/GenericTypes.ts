export type NormalizedObject<T> = {
    byId: {
        [key: number]: T;
    };
    all: number[];
}