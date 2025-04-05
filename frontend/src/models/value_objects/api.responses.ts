import FieldError from "./field.error";
import Search from "./search";

export enum ApiErrorType {
  Internal = "Internal",
  BadRequest = "BadRequest",
}

export type ApiErrorResponse = {
  type: ApiErrorType;
  message: string;
  errors: FieldError[];
};

export type ApiRecordResponse<M> = {
  message: string;
  registro: M;
};

export type ApiRecordsResponse<M, C> = {
  message: string;
  search: Search<M, C>;
};
