import { Request, Response } from "express";
import Controlador from "../controlador/controlador.js";
import RespuestaJsonError from "../modelo/exceptions/respuesta.json.error.js";
import { enteroObligatorioServicio } from "../servicios/servicio.enteros.js";

export default class Handler<M, NM, I, C> {
  private controlador: Controlador<M, NM, I, C>;
  private eventoAgregar?: (req: Request) => NM;
  private eventoActualizar?: (req: Request) => M;
  private obtenerId?: (req: Request) => I;
  private eventoBuscar?: (req: Request) => { criterio: C; pagina: number };

  constructor({ controlador }: { controlador: Controlador<M, NM, I, C> }) {
    this.controlador = controlador;
  }

  public onAgregar(evento: (req: Request) => NM) {
    this.eventoAgregar = evento;
  }

  public onActualizar(evento: (req: Request) => M) {
    this.eventoActualizar = evento;
  }

  public onObtenerId(evento: (req: Request) => I) {
    this.obtenerId = evento;
  }

  public onBuscar(evento: (req: Request) => { criterio: C; pagina: number }) {
    this.eventoBuscar = evento;
  }

  private manejarError(error: unknown, res: Response) {
    if (error instanceof RespuestaJsonError) {
      const errores = error.errors;
      res.status(400).json({ errores });
    } else {
      console.error(error);
      res.status(500).json({ mensaje: "Internal server error" });
    }
  }

  public async agregar(req: Request, res: Response) {
    try {
      if (!this.eventoAgregar) {
        throw new Error("No se implementó eventoAgregar()");
      }

      const nuevo = this.eventoAgregar(req);
      const creado = await this.controlador.agregar(nuevo);
      res
        .status(201)
        .json({ mensaje: "Registro creado correctamente", creado });
    } catch (e) {
      this.manejarError(e, res);
    }
  }

  public async actualizar(req: Request, res: Response) {
    try {
      if (!this.eventoActualizar) {
        throw new Error("No se implementó eventoActualizar()");
      }

      const nuevo = this.eventoActualizar(req);
      const actualizado = await this.controlador.actualizar(nuevo);
      res
        .status(200)
        .json({ mensaje: "Registro actualizado correctamente", actualizado });
    } catch (e) {
      this.manejarError(e, res);
    }
  }

  public async eliminar(req: Request, res: Response) {
    try {
      if (!this.obtenerId) {
        throw new Error("No se implementó obtenerId()");
      }

      const id = this.obtenerId(req);
      const eliminado = await this.controlador.eliminar(id);
      res
        .status(200)
        .json({ mensaje: "Registro eliminado correctamente", eliminado });
    } catch (e) {
      this.manejarError(e, res);
    }
  }

  public async obtener(req: Request, res: Response) {
    try {
      if (!this.obtenerId) {
        throw new Error("No se implementó obtenerId()");
      }

      const id = this.obtenerId(req);
      const dato = await this.controlador.obtener(id);
      if (dato) {
        res.status(200).json({ mensaje: "Dato encontrado", dato });
      } else {
        res.status(404).json({ mensaje: "Dato no encontrado" });
      }
    } catch (e) {
      this.manejarError(e, res);
    }
  }

  public async buscar(req: Request, res: Response) {
    try {
      if (!this.eventoBuscar) {
        throw new Error("No se implementó eventoBuscar()");
      }

      const { criterio, pagina } = this.eventoBuscar(req);

      const validacion = enteroObligatorioServicio.isValid(pagina);
      if (!validacion.valid) {
        throw new RespuestaJsonError([validacion.message as string[]]);
      }

      const dato = await this.controlador.buscar(criterio, pagina);
      if (dato) {
        res.status(200).json({ mensaje: "Dato encontrado", dato });
      } else {
        res.status(404).json({ mensaje: "Dato no encontrado" });
      }
    } catch (e) {
      this.manejarError(e, res);
    }
  }
}
