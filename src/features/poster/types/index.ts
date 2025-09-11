export interface Option<T extends string | number | boolean = string> {
  value: T;
  label: string;
  [key: string]: string | number | boolean | unknown;
}
