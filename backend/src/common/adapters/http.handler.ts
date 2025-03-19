import { Request, Response } from "express";
import Controller from "../application/controller.js";
import JsonErrorResponse from "../domain/exceptions/respuesta.json.error.js";
import { intService } from "../domain/services/int.service.js";

export default abstract class HttpHandler<M, NM, I, C> {
  protected ctrl: Controller<M, NM, I, C>;

  constructor(ctrl: Controller<M, NM, I, C>) {
    this.ctrl = ctrl;
  }

  protected manejarError(error: unknown, res: Response) {
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

  protected abstract addEvent(req: Request): NM;
  protected abstract updateEvent(req: Request): M;
  protected abstract getId(req: Request): I;
  protected abstract getByEvent(req: Request): {
    criteria: C;
    page: number;
  };
}
