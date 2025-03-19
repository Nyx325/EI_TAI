import { SearchableString } from "../../../common/domain/value_objects/string.criteria.js";

export default interface AlojamientoCriteria {
  descripcion?: number;
  banios?: number;
  alberca?: boolean;
  cocina?: boolean;
  wifi?: boolean;
  television?: boolean;
  aireAcondicionado?: boolean;
  precioPorNoche?: number;
  direccion?: SearchableString;
  ciudad?: SearchableString;
  estado?: SearchableString;
  pais?: SearchableString;
  codigoPostal?: SearchableString;
  latitud?: number;
  longitud?: number;
}
