import { PAGE_SIZE, prisma } from "../../config.js";
import searchableStringToPrisma from "../parsers/searchable.string.js";
import { fromNewAlojamiento, fromAlojamiento, toAlojamiento, } from "../parsers/alojamiento.prisma.parser.js";
export const alojamientoPrismaRepository = {
    async add(data) {
        const newRecord = await prisma.alojamiento.create({
            data: fromNewAlojamiento(data),
        });
        return toAlojamiento(newRecord);
    },
    async update(data) {
        const updated = await prisma.alojamiento.update({
            where: { id: data.id },
            data: fromAlojamiento(data),
        });
        return toAlojamiento(updated);
    },
    async delete(id) {
        const deleted = await prisma.alojamiento.delete({ where: { id } });
        return toAlojamiento(deleted);
    },
    async get(id) {
        const record = await prisma.alojamiento.findUnique({ where: { id } });
        return record ? toAlojamiento(record) : undefined;
    },
    async getBy(criteria, page) {
        const { descripcion, ...restCriteria } = criteria;
        const where = {
            ...restCriteria,
            descripcion: searchableStringToPrisma(descripcion),
        };
        const [results, totalResults] = await prisma.$transaction([
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
            result: results.map(toAlojamiento),
        };
    },
};
