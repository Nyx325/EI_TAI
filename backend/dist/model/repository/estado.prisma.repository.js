import { PAGE_SIZE, prisma } from "../../config.js";
import searchableStringToPrisma from "../parsers/searchable.string.js";
const estadoPrismaRepository = {
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
