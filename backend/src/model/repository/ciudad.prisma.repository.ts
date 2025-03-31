import { PAGE_SIZE, prisma } from "../../config.js";
import searchableStringToPrisma from "../parsers/searchable.string.js";
import Repository from "./repository.js";
import { Ciudad, NuevaCiudad, CiudadCriteria } from "../entity/ciudad.js";
import { toCiudad } from "../parsers/ciudad.prisma.parser.js";

const ciudadPrismaRepository: Repository<
  Ciudad,
  NuevaCiudad,
  number,
  CiudadCriteria
> = {
  async add(data) {
    const c = await prisma.ciudad.create({ data });
    return toCiudad(c);
  },

  async update(data) {
    const c = await prisma.ciudad.update({
      where: {
        id: data.id,
      },
      data,
    });

    return toCiudad(c);
  },

  async get(id) {
    const c = await prisma.ciudad.findUnique({
      where: { id },
    });

    return c ? toCiudad(c) : undefined;
  },

  async delete(id) {
    const c = await prisma.ciudad.delete({
      where: { id },
    });

    return toCiudad(c);
  },

  async getBy(criteria, page) {
    const { nombre, ...restC } = criteria;

    const where = {
      ...restC,
      nombre: searchableStringToPrisma(nombre),
    };

    const [result, totalResults] = await prisma.$transaction([
      prisma.ciudad.findMany({
        where,
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      }),
      prisma.ciudad.count({ where }),
    ]);

    return {
      totalPages: Math.ceil(totalResults / PAGE_SIZE),
      currentPage: page,
      criteria,
      result: result.map(toCiudad),
    };
  },
};

export default ciudadPrismaRepository;
