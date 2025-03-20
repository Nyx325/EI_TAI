export type ServiceValidation = { valid: boolean; message?: string[] };

export default interface Service<T> {
  isValid(value?: T): ServiceValidation;
}
