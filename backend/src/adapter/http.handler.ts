import { Request, Response } from "express";
import HttpController from "../application/http.controller.js";
import JsonResponse from "../domain/exceptions/json.response.js";

export default abstract class HttpHandler<JM, JC, M, NM, I, C> {
  protected ctrl: HttpController<JM, JC, M, NM, I, C>;

  constructor(ctrl: HttpController<JM, JC, M, NM, I, C>) {
    this.ctrl = ctrl;
  }

  protected manejarError(error: unknown, res: Response) {
    if (error instanceof JsonResponse) {
      const errores = error.errors;
      res.status(400).json({ errores });
    } else {
      console.error(error);
      res.status(500).json({ mensaje: "Internal server error" });
    }
  }

  public async add(req: Request, res: Response) {
    try {
      const creado = await this.ctrl.add(req.body);
      res
        .status(201)
        .json({ mensaje: "Registro creado correctamente", creado });
    } catch (e) {
      this.manejarError(e, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const actualizado = await this.ctrl.update(req.body);
      res
        .status(200)
        .json({ mensaje: "Registro actualizado correctamente", actualizado });
    } catch (e) {
      this.manejarError(e, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
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
      const { id } = req.params;
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
      const dato = await this.ctrl.getBy(req.query as JC);
      if (dato) {
        res.status(200).json({ mensaje: "Dato encontrado", dato });
      } else {
        res.status(404).json({ mensaje: "Dato no encontrado" });
      }
    } catch (e) {
      this.manejarError(e, res);
    }
  }

  protected abstract getByEvent(req: Request): {
    criteria: C;
    page: number;
  };
}
