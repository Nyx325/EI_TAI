import JsonResponse from "../domain/exceptions/json.response.js";
import { intService } from "../domain/services/int.service.js";
export default class HttpHandler {
    ctrl;
    constructor(ctrl) {
        this.ctrl = ctrl;
    }
    manejarError(error, res) {
        if (error instanceof JsonResponse) {
            const errores = error.errors;
            res.status(400).json({ errores });
        }
        else {
            console.error(error);
            res.status(500).json({ mensaje: "Internal server error" });
        }
    }
    async add(req, res) {
        try {
            const creado = await this.ctrl.add(req.body);
            res
                .status(201)
                .json({ mensaje: "Registro creado correctamente", creado });
        }
        catch (e) {
            this.manejarError(e, res);
        }
    }
    async update(req, res) {
        try {
            const actualizado = await this.ctrl.update(req.body);
            res
                .status(200)
                .json({ mensaje: "Registro actualizado correctamente", actualizado });
        }
        catch (e) {
            this.manejarError(e, res);
        }
    }
    async delete(req, res) {
        try {
            const id = this.getId(req);
            const eliminado = await this.ctrl.delete(id);
            res
                .status(200)
                .json({ mensaje: "Registro eliminado correctamente", eliminado });
        }
        catch (e) {
            this.manejarError(e, res);
        }
    }
    async get(req, res) {
        try {
            const id = this.getId(req);
            const dato = await this.ctrl.get(id);
            if (dato) {
                res.status(200).json({ mensaje: "Dato encontrado", dato });
            }
            else {
                res.status(404).json({ mensaje: "Dato no encontrado" });
            }
        }
        catch (e) {
            this.manejarError(e, res);
        }
    }
    async getBy(req, res) {
        try {
            const { criteria, page } = this.getByEvent(req.query);
            const validacion = intService.isValid(page);
            if (!validacion.valid) {
                throw new JsonResponse([validacion.message]);
            }
            const dato = await this.ctrl.getBy(criteria, page);
            if (dato) {
                res.status(200).json({ mensaje: "Dato encontrado", dato });
            }
            else {
                res.status(404).json({ mensaje: "Dato no encontrado" });
            }
        }
        catch (e) {
            this.manejarError(e, res);
        }
    }
}
