import {
  SearchableString,
  SearchMode,
} from "../domain/value_objects/string.criteria.js";

/**
 * Tipo que define un filtro de cadena para Prisma.
 *
 * @typedef {Object} StringFilterPrisma
 * @property {string} [contains] - Valor que se utilizará para búsquedas parciales.
 * @property {string} [equals] - Valor que se utilizará para coincidencias exactas.
 */
export type StringFilterPrisma = {
  contains?: string;
  equals?: string;
};

/**
 * Transforma un objeto de búsqueda de tipo `SearchableString` en un filtro compatible con Prisma.
 *
 * Dependiendo del modo especificado en el objeto `SearchableString`, se retorna un objeto que:
 * - Para `SearchMode.LIKE`: utiliza la propiedad `contains` para búsquedas parciales.
 * - Para `SearchMode.EQUALS`: utiliza la propiedad `equals` para coincidencias exactas.
 *
 * @param {SearchableString | undefined} search - Objeto de búsqueda que contiene el modo y la cadena a buscar.
 * @returns {StringFilterPrisma | undefined} - Objeto filtro para Prisma basado en el modo de búsqueda, o `undefined` si no se proporciona búsqueda.
 */
export default function searchableStringToPrisma(
  search?: SearchableString,
): StringFilterPrisma | undefined {
  if (!search) return undefined;

  const { mode, str } = search;

  const options: Record<SearchMode, StringFilterPrisma> = {
    [SearchMode.LIKE]: { contains: str },
    [SearchMode.EQUALS]: { equals: str },
  };

  return options[mode];
}
