import Controller from "./http.controller.js";
import { nameService } from "../domain/services/name.service.js";
import { intOrZeroService, intService, } from "../domain/services/int.service.js";
import { PriceService } from "../domain/services/float.service.js";
const precioPorNocheService = new PriceService(10, 3500);
export default class AlojamientoController extends Controller {
    constructor(repo) {
        super(repo);
    }
    add({ descripcion, banios, alberca, cocina, wifi, television, aire_acondicionado, precio_por_noche, direccion, ciudad, estado, pais, codigo_postal, latitud, longitud, }) {
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
        const albercaV = intOrZeroService.isValid(alberca);
        if (!albercaV.valid) {
            errors.push({
                field: "alberca",
                message: albercaV.message,
            });
        }
        const cocinaV = intOrZeroService.isValid(cocina);
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
        const aire_acondicionadoV = intOrZeroService.isValid(aire_acondicionado);
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
        const paisV = nameService.isValid(`${pais}`);
        if (!paisV.valid) {
            errors.push({
                field: "pais",
                message: paisV.message,
            });
        }
        return this.repo.add(newData);
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
