import { prisma } from "../config.js";
import searchableStringToPrisma from "../adapter/parser/searchable.string.js";
import { PAGE_SIZE } from "../config.js";
export const clientePrismaRepository = {
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
        return prisma.cliente.findUnique({ where: { id } });
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
            prisma.cliente.findMany({ where, take: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE }),
            prisma.cliente.count({ where }),
        ]);
        return {
            totalPages: Math.ceil(totalResults / PAGE_SIZE),
            currentPage: page,
            criteria,
            result,
        };
    },
};
