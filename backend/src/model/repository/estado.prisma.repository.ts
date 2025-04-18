import { PAGE_SIZE, prisma } from "../../config.js";
import searchableStringToPrisma from "../parsers/searchable.string.js";
import Repository from "./repository.js";
import { Estado, NuevoEstado, EstadoCriteria } from "../entity/estado.js";

const estadoPrismaRepository: Repository<
  Estado,
  NuevoEstado,
  number,
  EstadoCriteria
> = {
  add(data) {
    return prisma.estado.create({ data });
  },

  async update(d) {
    const { Ciudades, ...data } = d;
    return prisma.estado.update({
      where: {
        id: data.id,
      },
      data,
    });
  },

  get(id) {
    return prisma.estado.findUnique({ where: { id } });
  },

  delete(id) {
    return prisma.estado.delete({ where: { id } });
  },

  async getBy(criteria, page) {
    const { nombre } = criteria;

    const where = {
      nombre: searchableStringToPrisma(nombre),
    };

    const [result, totalResults] = await prisma.$transaction([
      prisma.estado.findMany({
        where,
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        orderBy: { nombre: "asc" },
      }),
      prisma.estado.count({ where }),
    ]);

    return {
      totalPages: Math.ceil(totalResults / PAGE_SIZE),
      currentPage: page,
      criteria,
      result,
    };
  },
};

export default estadoPrismaRepository;
