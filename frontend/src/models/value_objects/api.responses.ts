import FieldError from "./field.error";
import Search from "./search";

export type ApiErrorResponse = {
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
