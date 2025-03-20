import {
  SearchableString,
  SearchMode,
} from "../domain/value_objects/string.criteria.js";

export type StringFilterPrisma = {
  contains?: string;
  equals?: string;
};

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
