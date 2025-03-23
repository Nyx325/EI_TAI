import { prisma } from "../config.js";
import Repository from "../application/repository.js";
import {Alojamiento, NewAlojamiento, AlojamientoCriteria} from "../domain/entities/alojamiento.js";

import {
  convertAlojamientoToPrisma,
  convertPrismaToAlojamiento,
} from "../adapter/alojamiento.prisma.adapter.js";
import Search from "../domain/value_objects/search.js";
import searchableStringToPrisma from "../adapter/searchable.string.js";
import { PAGE_SIZE } from "../config.js";

export default class AlojamientoPrismaRepository
  implements
    Repository<Alojamiento, NewAlojamiento, number, AlojamientoCriteria>
{
  async add(newData: NewAlojamiento): Promise<Alojamiento> {
    return prisma.alojamiento
      .create({ data: newData })
      .then((nuevo) => convertPrismaToAlojamiento(nuevo));
  }

  async update(data: Alojamiento): Promise<Alojamiento> {
    return prisma.alojamiento
      .update({
        where: { id: data.id },
        data: convertAlojamientoToPrisma(data),
      })
      .then((actualizado) => convertPrismaToAlojamiento(actualizado));
  }

  async get(id: number): Promise<Alojamiento | null | undefined> {
    return prisma.alojamiento
      .findFirst({
        where: { id },
      })
      .then((result) => (result ? convertPrismaToAlojamiento(result) : null));
  }

  async delete(id: number): Promise<Alojamiento> {
    return prisma.alojamiento
      .delete({
        where: { id },
      })
      .then((result) => convertPrismaToAlojamiento(result));
  }

  async getBy(
    criteria: AlojamientoCriteria,
    page: number,
  ): Promise<Search<Alojamiento, AlojamientoCriteria>> {
    const {
      descripcion,
      ...restCriteria
    } = criteria;

    const where = {
      ...restCriteria, // Campos que no necesitan conversión
      descripcion: searchableStringToPrisma(descripcion),
    };

    const [results, totalResults] = await Promise.all([
      prisma.alojamiento.findMany({
        where,
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      }),
      prisma.alojamiento.count({ where }),
    ]);

    return {
      totalPages: Math.ceil(totalResults / PAGE_SIZE),
      currentPage: page,
      criteria,
      result: results.map(convertPrismaToAlojamiento),
    };
  }
}
