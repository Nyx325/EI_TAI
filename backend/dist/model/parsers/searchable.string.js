import { SearchMode, } from "../value_object/searchable.string.js";
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
export default function searchableStringToPrisma(search) {
    if (!search)
        return undefined;
    const { mode, str } = search;
    const options = {
        [SearchMode.LIKE]: { contains: str },
        [SearchMode.EQUALS]: { equals: str },
    };
    return options[mode];
}
