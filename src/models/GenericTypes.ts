import { schema, normalize } from "normalizr";

export type NormalizedObject<T> = {
  byId: {
    [key: number]: T;
  };
  all: number[];
};

export type ByIdObject<T> = {
  [key: number]: T;
};

export type ResponseError = {
  code: number;
  message: string;
  status: string;
};

export type AsyncAction<T> = {
  payload: T;
};
export const genericNormalize = (item: any[]) => {
  const expSchema = new schema.Entity("items", undefined, {
    idAttribute: "id",
  });

  let normalized = normalize(
    item.map((i) => i as any),
    [expSchema]
  );
  return {
    byId: normalized.entities.items,
    all: normalized.result,
  };
};

export interface ApiResponse<T> {
  status: "ok" | "error";
  code: number;
  data: T;
}

export interface Annotation {
  id: number;
  link: string;
}
