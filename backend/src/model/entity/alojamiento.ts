import { SearchableString } from "../value_object/searchable.string.js";

/**
 * Interfaz que define la estructura para crear un nuevo alojamiento.
 *
 * @interface NewAlojamiento
 */
export interface NewAlojamiento {
  /** Descripción del alojamiento. */
  descripcion: string;
  /** Número de baños. */
  banios: number;
  /** Indica si cuenta con alberca. */
  alberca: boolean;
  /** Indica si cuenta con cocina. */
  cocina: boolean;
  /** Indica si cuenta con wifi. */
  wifi: boolean;
  /** Indica si cuenta con televisión. */
  television: boolean;
  /** Indica si cuenta con aire acondicionado. */
  aireAcondicionado: boolean;
  /** Precio por noche. */
  precioPorNoche: number;
  /** Latitud geográfica. */
  latitud: number;
  /** Longitud geográfica. */
  longitud: number;
}

/**
 * Interfaz que define la estructura de un alojamiento persistido.
 *
 * @interface Alojamiento
 */
export interface Alojamiento {
  /** Identificador único del alojamiento. */
  id: number;
  /** Descripción del alojamiento. */
  descripcion: string;
  /** Número de baños. */
  banios: number;
  /** Indica si cuenta con alberca. */
  alberca: boolean;
  /** Indica si cuenta con cocina. */
  cocina: boolean;
  /** Indica si cuenta con wifi. */
  wifi: boolean;
  /** Indica si cuenta con televisión. */
  television: boolean;
  /** Indica si cuenta con aire acondicionado. */
  aireAcondicionado: boolean;
  /** Precio por noche. */
  precioPorNoche: number;
  /** Latitud geográfica. */
  latitud: number;
  /** Longitud geográfica. */
  longitud: number;
}

/**
 * Interfaz que define los criterios de búsqueda para alojamientos.
 *
 * @interface AlojamientoCriteria
 */
export interface AlojamientoCriteria {
  /** Criterio de búsqueda para la descripción, utilizando un valor de tipo SearchableString. */
  descripcion?: SearchableString;
  /** Número de baños (opcional). */
  banios?: number;
  /** Filtrado por disponibilidad de alberca (opcional). */
  alberca?: boolean;
  /** Filtrado por disponibilidad de cocina (opcional). */
  cocina?: boolean;
  /** Filtrado por disponibilidad de wifi (opcional). */
  wifi?: boolean;
  /** Filtrado por disponibilidad de televisión (opcional). */
  television?: boolean;
  /** Filtrado por disponibilidad de aire acondicionado (opcional). */
  aireAcondicionado?: boolean;
  /** Filtrado por precio por noche (opcional). */
  precioPorNoche?: number;
  /** Filtrado por latitud geográfica (opcional). */
  latitud?: number;
  /** Filtrado por longitud geográfica (opcional). */
  longitud?: number;
}

/**
 * Interfaz que define la estructura de un objeto JSON que representa un alojamiento.
 *
 * Esta interfaz es útil para la validación y transformación de datos recibidos en formato JSON.
 *
 * @interface AlojamientoJson
 */
export interface AlojamientoJson {
  id?: unknown;
  descripcion?: unknown;
  banios?: unknown;
  alberca?: unknown;
  cocina?: unknown;
  wifi?: unknown;
  television?: unknown;
  aire_acondicionado?: unknown;
  precio_por_noche?: unknown;
  latitud?: unknown;
  longitud?: unknown;
}

/**
 * Interfaz que define la estructura de un objeto JSON para los criterios de búsqueda de alojamientos.
 *
 * Incluye opciones adicionales como la paginación.
 *
 * @interface AlojamientoCriteriaJson
 */
export interface AlojamientoCriteriaQuery {
  descripcion?: unknown;
  banios?: unknown;
  alberca?: unknown;
  cocina?: unknown;
  wifi?: unknown;
  television?: unknown;
  aireAcondicionado?: unknown;
  precioPorNoche?: unknown;
  latitud?: unknown;
  longitud?: unknown;
  /** Parámetro opcional para la paginación. */
  page?: unknown;
}
