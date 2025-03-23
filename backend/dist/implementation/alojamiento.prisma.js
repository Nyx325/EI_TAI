import { prisma } from "../config.js";
import { convertAlojamientoToPrisma, convertPrismaToAlojamiento, } from "../adapter/alojamiento.prisma.adapter.js";
import searchableStringToPrisma from "../adapter/searchable.string.js";
import { PAGE_SIZE } from "../config.js";
export default class AlojamientoPrismaRepository {
    async add(newData) {
        return prisma.alojamiento
            .create({ data: newData })
            .then((nuevo) => convertPrismaToAlojamiento(nuevo));
    }
    async update(data) {
        return prisma.alojamiento
            .update({
            where: { id: data.id },
            data: convertAlojamientoToPrisma(data),
        })
            .then((actualizado) => convertPrismaToAlojamiento(actualizado));
    }
    async get(id) {
        return prisma.alojamiento
            .findFirst({
            where: { id },
        })
            .then((result) => (result ? convertPrismaToAlojamiento(result) : null));
    }
    async delete(id) {
        return prisma.alojamiento
            .delete({
            where: { id },
        })
            .then((result) => convertPrismaToAlojamiento(result));
    }
    async getBy(criteria, page) {
        const { descripcion, ...restCriteria } = criteria;
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
