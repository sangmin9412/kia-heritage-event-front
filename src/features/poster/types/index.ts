export interface Option<T extends string = string> {
  value: T;
  label: string;
  [key: string]: string | number | boolean | unknown;
}
