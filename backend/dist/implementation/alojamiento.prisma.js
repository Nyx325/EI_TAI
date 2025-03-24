import { prisma } from "../config.js";
import searchableStringToPrisma from "../adapter/searchable.string.js";
import { PAGE_SIZE } from "../config.js";
import HttpHandler from "../adapter/http.handler.js";
import AlojamientoController from "../adapter/alojamiento.controller.js";
import { convertAlojamientoToPrisma, convertPrismaToAlojamiento, } from "../adapter/alojamiento.prisma.adapter.js";
export const alojamientoPrismaRepository = {
    async add(newData) {
        return prisma.alojamiento
            .create({ data: newData })
            .then((nuevo) => convertPrismaToAlojamiento(nuevo));
    },
    async update(data) {
        return prisma.alojamiento
            .update({
            where: { id: data.id },
            data: convertAlojamientoToPrisma(data),
        })
            .then((actualizado) => convertPrismaToAlojamiento(actualizado));
    },
    async get(id) {
        return prisma.alojamiento
            .findUnique({
            where: { id },
        })
            .then((result) => (result ? convertPrismaToAlojamiento(result) : null));
    },
    async delete(id) {
        return prisma.alojamiento
            .delete({
            where: { id },
        })
            .then((result) => convertPrismaToAlojamiento(result));
    },
    async getBy(criteria, page) {
        const { descripcion, ...restCriteria } = criteria;
        const where = {
            ...restCriteria, // Campos que no necesitan conversión
            descripcion: searchableStringToPrisma(descripcion),
        };
        const [results, totalResults] = await prisma.$transaction([
            prisma.alojamiento.findMany({ where, take: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE }),
            prisma.alojamiento.count({ where }),
        ]);
        return {
            totalPages: Math.ceil(totalResults / PAGE_SIZE),
            currentPage: page,
            criteria,
            result: results.map(convertPrismaToAlojamiento),
        };
    },
};
const controller = new AlojamientoController(alojamientoPrismaRepository);
export const alojamientoPrismaHandler = new HttpHandler(controller);
