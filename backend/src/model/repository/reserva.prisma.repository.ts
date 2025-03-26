import Repository from "./repository.js";
import { NewReserva, Reserva, ReservaCriteria } from "../entity/reserva.js";
import { PAGE_SIZE, prisma } from "../../config.js";
import searchableStringToPrisma from "../parsers/searchable.string.js";
import { Decimal } from "@prisma/client/runtime/client";
import { fromNewReserva, fromReserva, toReserva } from "../parsers/reserva.prisma.parser.js";
import { Reserva as PrismaReserva } from "@prisma/client";

export const reservaPrismaRepository: Repository<
  Reserva,
  NewReserva,
  number,
  ReservaCriteria
> = {
  async add(data) {
    const reserva = await prisma.reserva.create({
      data: fromNewReserva(data),
      include: {
        Cliente: true,
        Alojamiento: true
      }
    });

    return toReserva(reserva);
  },

  update(data) {
    const reserva = prisma.reserva.update({
      where: { id: data.id },
      data: fromReserva(data),
    });

  },

  delete(id) {
    return prisma.reserva.delete({ where: { id } });
  },

  get(id) {
    return prisma.reserva.findUnique({ where: { id } });
  },

  async getBy(criteria, page) {
    const { nombres, apellidoP, apellidoM, email, ...restCriteria } = criteria;

    const where = {
      ...restCriteria,
      nombres: searchableStringToPrisma(nombres),
      apellidoP: searchableStringToPrisma(apellidoP),
      apellidoM: searchableStringToPrisma(apellidoM),
      email: searchableStringToPrisma(email),
    };

    const [result, totalResults] = await prisma.$transaction([
      prisma.reserva.findMany({
        where,
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      }),
      prisma.reserva.count({ where }),
    ]);

    return {
      totalPages: Math.ceil(totalResults / PAGE_SIZE),
      currentPage: page,
      criteria,
      result,
    };
  },
};
