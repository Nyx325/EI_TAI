import { Request, Response } from "express";
import Controller from "../../application/controller.js";
import JsonErrorResponse from "../../domain/exceptions/respuesta.json.error.js";
import { intService } from "../../domain/services/int.service.js";

export default class Handler<M, NM, I, C> {
  private ctrl: Controller<M, NM, I, C>;
  private addEvent?: (req: Request) => NM;
  private updateEvent?: (req: Request) => M;
  private getId?: (req: Request) => I;
  private getByEvent?: (req: Request) => { criteria: C; page: number };

  constructor({ ctrl }: { ctrl: Controller<M, NM, I, C> }) {
    this.ctrl = ctrl;
  }

  public onAdd(event: (req: Request) => NM) {
    this.addEvent = event;
  }

  public onUpdate(event: (req: Request) => M) {
    this.updateEvent = event;
  }

  public onGetId(event: (req: Request) => I) {
    this.getId = event;
  }

  public onGetBy(event: (req: Request) => { criteria: C; page: number }) {
    this.getByEvent = event;
  }

  private manejarError(error: unknown, res: Response) {
    if (error instanceof JsonErrorResponse) {
      const errores = error.errors;
      res.status(400).json({ errores });
    } else {
      console.error(error);
      res.status(500).json({ mensaje: "Internal server error" });
    }
  }

  public async add(req: Request, res: Response) {
    try {
      if (!this.addEvent) {
        throw new Error("No se implementó addEvent()");
      }

      const nuevo = this.addEvent(req);
      const creado = await this.ctrl.add(nuevo);
      res
        .status(201)
        .json({ mensaje: "Registro creado correctamente", creado });
    } catch (e) {
      this.manejarError(e, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      if (!this.updateEvent) {
        throw new Error("No se implementó updateEvent()");
      }

      const nuevo = this.updateEvent(req);
      const actualizado = await this.ctrl.update(nuevo);
      res
        .status(200)
        .json({ mensaje: "Registro actualizado correctamente", actualizado });
    } catch (e) {
      this.manejarError(e, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      if (!this.getId) {
        throw new Error("No se implementó getId()");
      }

      const id = this.getId(req);
      const eliminado = await this.ctrl.delete(id);
      res
        .status(200)
        .json({ mensaje: "Registro eliminado correctamente", eliminado });
    } catch (e) {
      this.manejarError(e, res);
    }
  }

  public async get(req: Request, res: Response) {
    try {
      if (!this.getId) {
        throw new Error("No se implementó getId()");
      }

      const id = this.getId(req);
      const dato = await this.ctrl.get(id);
      if (dato) {
        res.status(200).json({ mensaje: "Dato encontrado", dato });
      } else {
        res.status(404).json({ mensaje: "Dato no encontrado" });
      }
    } catch (e) {
      this.manejarError(e, res);
    }
  }

  public async getBy(req: Request, res: Response) {
    try {
      if (!this.getByEvent) {
        throw new Error("No se implementó getByEvent()");
      }

      const { criteria, page } = this.getByEvent(req);

      const validacion = intService.isValid(page);
      if (!validacion.valid) {
        throw new JsonErrorResponse([validacion.message as string[]]);
      }

      const dato = await this.ctrl.getBy(criteria, page);
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
