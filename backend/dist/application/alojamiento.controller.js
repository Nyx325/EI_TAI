import Controller from "./http.controller.js";
import { intOrZeroService, intService, } from "../domain/services/int.service.js";
import { longitudeService, PriceService, } from "../domain/services/float.service.js";
import { booleanService, instanceBool, } from "../domain/services/boolean.service.js";
const precioPorNocheService = new PriceService(10, 3500);
export default class AlojamientoController extends Controller {
    constructor(repo) {
        super(repo);
    }
    add({ descripcion, banios, alberca, cocina, wifi, television, aire_acondicionado, precio_por_noche, latitud, longitud, }) {
        const errors = [];
        if (!descripcion || `${descripcion}`.trim() === "") {
            errors.push({
                field: "descripcion",
                message: "Descripción requerida",
            });
        }
        const baniosV = intService.isValid(banios);
        if (!baniosV.valid) {
            errors.push({
                field: "banios",
                message: baniosV.message,
            });
        }
        const albercaV = booleanService.isValid(alberca);
        if (!albercaV.valid) {
            errors.push({
                field: "alberca",
                message: albercaV.message,
            });
        }
        const cocinaV = booleanService.isValid(cocina);
        if (!cocinaV.valid) {
            errors.push({
                field: "cocina",
                message: cocinaV.message,
            });
        }
        const wifiV = intOrZeroService.isValid(wifi);
        if (!wifiV.valid) {
            errors.push({
                field: "wifi",
                message: wifiV.message,
            });
        }
        const televisionV = intOrZeroService.isValid(television);
        if (!televisionV.valid) {
            errors.push({
                field: "television",
                message: televisionV.message,
            });
        }
        const aire_acondicionadoV = booleanService.isValid(aire_acondicionado);
        if (!aire_acondicionadoV.valid) {
            errors.push({
                field: "aire_acondicionado",
                message: aire_acondicionadoV.message,
            });
        }
        const precio_por_nocheV = precioPorNocheService.isValid(precio_por_noche);
        if (!precio_por_nocheV.valid) {
            errors.push({
                field: "precio_por_noche",
                message: precio_por_nocheV.message,
            });
        }
        const longitudV = longitudeService.isValid(longitud);
        if (!longitudV.valid) {
            errors.push({
                field: "longitud",
                message: longitudV.message,
            });
        }
        const latitudV = longitudeService.isValid(latitud);
        if (!latitudV.valid) {
            errors.push({
                field: "latitud",
                message: latitudV.message,
            });
        }
        return this.repo.add({
            longitud: Number(longitud),
            latitud: Number(latitud),
            aireAcondicionado: instanceBool(aire_acondicionado),
            alberca: instanceBool(alberca),
            banios: Number(banios),
            cocina: instanceBool(cocina),
            descripcion: `${descripcion}`,
            precioPorNoche: Number(precio_por_noche),
            television: instanceBool(television),
            wifi: instanceBool(wifi),
        });
    }
    update(data) {
        return this.repo.update(data);
    }
    delete(id) {
        return this.repo.delete(id);
    }
    get(id) {
        return this.repo.get(id);
    }
    getBy(data) {
        return this.repo.getBy(criteria, page);
    }
}
