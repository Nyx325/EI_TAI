import { prisma } from "../config.js";
import Repository from "../application/repository.js";
import searchableStringToPrisma from "../adapter/searchable.string.js";
import { PAGE_SIZE } from "../config.js";
import Search from "../domain/value_objects/search.js";
import {
  Cliente,
  ClienteNuevo,
  ClienteCriteria,
} from "../domain/entities/cliente.js";

export const clientePrismaRepository: Repository<
  Cliente,
  ClienteNuevo,
  number,
  ClienteCriteria
> = {
  add(data) {
    return prisma.cliente.create({ data });
  },

  update(data) {
    return prisma.cliente.update({
      where: { id: data.id },
      data,
    });
  },

  delete(id) {
    return prisma.cliente.delete({ where: { id } });
  },

  get(id) {
    return prisma.cliente.findFirst({ where: { id } });
  },

  getBy(criteria, page) {
    const { nombres, apellidoP, apellidoM, ...restCriteria } = criteria;

    const where = {
      ...restCriteria,
      nombres: searchableStringToPrisma(nombres),
      apellidoP: searchableStringToPrisma(apellidoP),
    };
  },
};
