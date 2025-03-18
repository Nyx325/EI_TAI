export default interface Servicio<T> {
  isValid(value?: T): { valid: boolean; message?: string[] };
}
