import JsonErrorResponse from "../../domain/exceptions/respuesta.json.error.js";
import { intService } from "../../domain/services/int.service.js";
export default class Handler {
    ctrl;
    addEvent;
    updateEvent;
    getId;
    getByEvent;
    constructor({ ctrl }) {
        this.ctrl = ctrl;
    }
    onAdd(event) {
        this.addEvent = event;
    }
    onUpdate(event) {
        this.updateEvent = event;
    }
    onGetId(event) {
        this.getId = event;
    }
    onGetBy(event) {
        this.getByEvent = event;
    }
    manejarError(error, res) {
        if (error instanceof JsonErrorResponse) {
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
            if (!this.addEvent) {
                throw new Error("No se implementó addEvent()");
            }
            const nuevo = this.addEvent(req);
            const creado = await this.ctrl.add(nuevo);
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
            if (!this.updateEvent) {
                throw new Error("No se implementó updateEvent()");
            }
            const nuevo = this.updateEvent(req);
            const actualizado = await this.ctrl.update(nuevo);
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
            if (!this.getId) {
                throw new Error("No se implementó getId()");
            }
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
            if (!this.getId) {
                throw new Error("No se implementó getId()");
            }
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
            if (!this.getByEvent) {
                throw new Error("No se implementó getByEvent()");
            }
            const { criteria, page } = this.getByEvent(req);
            const validacion = intService.isValid(page);
            if (!validacion.valid) {
                throw new JsonErrorResponse([validacion.message]);
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
