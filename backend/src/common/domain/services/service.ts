export default interface Service<T> {
  isValid(value?: T): { valid: boolean; message?: string[] };
}
