import { Request, Response } from "express";
import HttpController from "./http.controller.js";
import JsonResponse from "../domain/exceptions/json.response.js";

/**
 * Clase genérica para el manejo de peticiones HTTP utilizando un controlador.
 *
 * @template JM - Tipo de datos JSON del modelo (entrada).
 * @template QC - Tipo de datos del criterio (entrada) para búsquedas.
 * @template M - Tipo de modelo persistido.
 * @template NM - Tipo de datos para crear un nuevo modelo.
 * @template I - Tipo de identificador único del modelo.
 * @template C - Tipo de criterio para búsquedas en el controlador.
 */
export default class HttpHandler<JM, QC, M, NM, I, C> {
  /**
   * Instancia del controlador que contiene la lógica de negocio.
   */
  protected ctrl: HttpController<JM, QC, M, NM, I, C>;

  /**
   * Crea una instancia de HttpHandler.
   *
   * @param ctrl - Instancia de HttpController que se usará para manejar la lógica de negocio.
   */
  constructor(ctrl: HttpController<JM, QC, M, NM, I, C>) {
    this.ctrl = ctrl;
  }

  /**
   * Maneja los errores ocurridos durante la ejecución de las operaciones.
   *
   * Si el error es una instancia de JsonResponse, envía una respuesta con estado 400 y muestra los errores.
   * En caso contrario, registra el error y envía una respuesta con estado 500.
   *
   * @param error - Error ocurrido durante la operación.
   * @param res - Objeto Response de Express para enviar la respuesta HTTP.
   */
  protected manejarError(error: unknown, res: Response) {
    if (error instanceof JsonResponse) {
      const errores = error.errors.flat(); // Aplanar array
      res.status(400).json({ errores });
    } else {
      console.error(error);
      res.status(500).json({ mensaje: "Internal server error" });
    }
  }

  /**
   * Agrega un nuevo registro.
   *
   * Llama al método "add" del controlador y, en caso de éxito, envía una respuesta con estado 201.
   *
   * @param req - Objeto Request de Express que contiene el cuerpo de la petición.
   * @param res - Objeto Response de Express para enviar la respuesta HTTP.
   */
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

  /**
   * Actualiza un registro existente.
   *
   * Llama al método "update" del controlador y, en caso de éxito, envía una respuesta con estado 200.
   *
   * @param req - Objeto Request de Express que contiene el cuerpo con los datos a actualizar.
   * @param res - Objeto Response de Express para enviar la respuesta HTTP.
   */
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

  /**
   * Elimina un registro.
   *
   * Llama al método "delete" del controlador utilizando el parámetro "id" de la URL.
   * Envía una respuesta con estado 200 en caso de éxito.
   *
   * @param req - Objeto Request de Express que debe incluir el parámetro "id" en la URL.
   * @param res - Objeto Response de Express para enviar la respuesta HTTP.
   */
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

  /**
   * Obtiene un registro específico.
   *
   * Llama al método "get" del controlador utilizando el parámetro "id" de la URL.
   * Envía una respuesta con estado 200 si el dato se encuentra o 404 en caso contrario.
   *
   * @param req - Objeto Request de Express que debe incluir el parámetro "id" en la URL.
   * @param res - Objeto Response de Express para enviar la respuesta HTTP.
   */
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

  /**
   * Realiza una búsqueda basada en criterios especificados en la consulta.
   *
   * Llama al método "getBy" del controlador, pasando los parámetros de búsqueda del query.
   * Si no se encuentran resultados, envía una respuesta con estado 404.
   *
   * @param req - Objeto Request de Express que contiene los parámetros de búsqueda en `req.query`.
   * @param res - Objeto Response de Express para enviar la respuesta HTTP.
   */
  public async getBy(req: Request, res: Response) {
    try {
      const busqueda = await this.ctrl.getBy(req.query as QC);
      if (busqueda.result.length === 0) {
        res.status(404).json({
          message: "No se encontraron resultados"
        });
      } else {
        res.status(200).json({ busqueda });
      }
    } catch (e) {
      this.manejarError(e, res);
    }
  }
}
