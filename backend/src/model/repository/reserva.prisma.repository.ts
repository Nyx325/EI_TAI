import Repository from "./repository.js";
import { NewReserva, Reserva, ReservaCriteria } from "../entity/reserva.js";
import { PAGE_SIZE, prisma } from "../../config.js";
import { toReserva } from "../parsers/reserva.prisma.parser.js";

export const reservaPrismaRepository: Repository<
  Reserva,
  NewReserva,
  number,
  ReservaCriteria
> = {
  async add(data) {
    const reserva = await prisma.reserva.create({
      data,
      include: {
        Cliente: true,
        Alojamiento: true
      }
    });

    return toReserva(reserva);
  },

  async update(d) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {Cliente, Alojamiento, ...data} = d;
    const reserva = await prisma.reserva.update({
      where: { id: data.id },
      data,
      include: {
        Cliente:true,
        Alojamiento: true
      }
    });

    return toReserva(reserva);
  },

  async delete(id) {
    const reserva = await prisma.reserva.delete({ where: { id } });
    return toReserva(reserva);
  },

  async get(id) {
    const reserva = await prisma.reserva.findUnique({ where: { id } });
    return reserva ? toReserva(reserva) : undefined;
  },

  async getBy(criteria, page) {
    const [result, totalResults] = await prisma.$transaction([
      prisma.reserva.findMany({
        where: criteria,
        include: {
          Cliente:true,
          Alojamiento: true
        },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      }),
      prisma.reserva.count({ where: criteria }),
    ]);

    return {
      totalPages: Math.ceil(totalResults / PAGE_SIZE),
      currentPage: page,
      criteria,
      result: result.map(toReserva),
    };
  },
};
