import { SearchMode, } from "../domain/value_objects/string.criteria.js";
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
