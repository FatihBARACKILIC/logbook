export type Prettify<T> = {
  [K in keyof T]: T;
} & {};
