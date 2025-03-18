import RespuestaJsonError from "../modelo/exceptions/respuesta.json.error.js";
import { enteroObligatorioServicio } from "../servicios/servicio.enteros.js";
export default class Handler {
    controlador;
    eventoAgregar;
    eventoActualizar;
    obtenerId;
    eventoBuscar;
    constructor({ controlador }) {
        this.controlador = controlador;
    }
    onAgregar(evento) {
        this.eventoAgregar = evento;
    }
    onActualizar(evento) {
        this.eventoActualizar = evento;
    }
    onObtenerId(evento) {
        this.obtenerId = evento;
    }
    onBuscar(evento) {
        this.eventoBuscar = evento;
    }
    manejarError(error, res) {
        if (error instanceof RespuestaJsonError) {
            const errores = error.errors;
            res.status(400).json({ errores });
        }
        else {
            console.error(error);
            res.status(500).json({ mensaje: "Internal server error" });
        }
    }
    async agregar(req, res) {
        try {
            if (!this.eventoAgregar) {
                throw new Error("No se implementó eventoAgregar()");
            }
            const nuevo = this.eventoAgregar(req);
            const creado = await this.controlador.agregar(nuevo);
            res
                .status(201)
                .json({ mensaje: "Registro creado correctamente", creado });
        }
        catch (e) {
            this.manejarError(e, res);
        }
    }
    async actualizar(req, res) {
        try {
            if (!this.eventoActualizar) {
                throw new Error("No se implementó eventoActualizar()");
            }
            const nuevo = this.eventoActualizar(req);
            const actualizado = await this.controlador.actualizar(nuevo);
            res
                .status(201)
                .json({ mensaje: "Registro actualizado correctamente", actualizado });
        }
        catch (e) {
            this.manejarError(e, res);
        }
    }
    async eliminar(req, res) {
        try {
            if (!this.obtenerId) {
                throw new Error("No se implementó obtenerId()");
            }
            const id = this.obtenerId(req);
            const eliminado = await this.controlador.eliminar(id);
            res
                .status(201)
                .json({ mensaje: "Registro eliminado correctamente", eliminado });
        }
        catch (e) {
            this.manejarError(e, res);
        }
    }
    async obtener(req, res) {
        try {
            if (!this.obtenerId) {
                throw new Error("No se implementó obtenerId()");
            }
            const id = this.obtenerId(req);
            const dato = await this.controlador.obtener(id);
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
    async buscar(req, res) {
        try {
            if (!this.eventoBuscar) {
                throw new Error("No se implementó eventoBuscar()");
            }
            const { criterio, pagina } = this.eventoBuscar(req);
            const validacion = enteroObligatorioServicio.isValid(pagina);
            if (!validacion.valid) {
                throw new RespuestaJsonError([validacion.message]);
            }
            const dato = await this.controlador.buscar(criterio, pagina);
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
