import { PAGE_SIZE, prisma } from "../../config.js";
import searchableStringToPrisma from "../parsers/searchable.string.js";
import { fromCliente, fromTipoCliente, toCliente, } from "../parsers/cliente.prisma.parser.js";
export const clientePrismaRepository = {
    async add(data) {
        const { tipo, ...restD } = data;
        const c = await prisma.cliente.create({
            data: {
                ...restD,
                tipo: tipo ? fromTipoCliente(tipo) : undefined,
            },
        });
        return toCliente(c);
    },
    async update(data) {
        const c = await prisma.cliente.update({
            where: { id: data.id },
            data: fromCliente(data),
        });
        return toCliente(c);
    },
    async delete(id) {
        const c = await prisma.cliente.delete({ where: { id } });
        return toCliente(c);
    },
    async get(id) {
        const c = await prisma.cliente.findUnique({ where: { id } });
        return c ? toCliente(c) : null;
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
            prisma.cliente.findMany({
                where,
                take: PAGE_SIZE,
                skip: (page - 1) * PAGE_SIZE,
                orderBy: { apellidoP: "asc" },
            }),
            prisma.cliente.count({ where }),
        ]);
        return {
            totalPages: Math.ceil(totalResults / PAGE_SIZE),
            currentPage: page,
            criteria,
            result: result.map(toCliente),
        };
    },
};
