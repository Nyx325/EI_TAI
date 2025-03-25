import { Request, Response } from "express";
import HttpController from "../controller/http.controller.js";

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
export default class HttpHandler<M, NM, I, C> {
  /**
   * Instancia del controlador que contiene la lógica de negocio.
   */
  protected ctrl: HttpController<M, NM, I, C>;

  /**
   * Crea una instancia de HttpHandler.
   *
   * @param ctrl - Instancia de HttpController que se usará para manejar la lógica de negocio.
   */
  constructor(ctrl: HttpController<M, NM, I, C>) {
    this.ctrl = ctrl;
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
      const result = await this.ctrl.add(req.body);
      result.match(
        (registro) => {
          res.status(201).json({
            message: "Registro creado con éxito",
            registro,
          });
        },
        (errs) => {
          res.status(400).json({ errs });
        },
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
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
      const result = await this.ctrl.update(req.body);
      result.match(
        (registro) => {
          res.status(200).json({
            message: "Dato actualizado con éxito",
            registro,
          });
        },
        (errs) => {
          res.status(400).json({ errs });
        },
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
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
      const result = await this.ctrl.delete(id);
      result.match(
        (registro) => {
          res.status(200).json({
            message: "Dato eliminado con éxito",
            registro,
          });
        },
        (errs) => {
          res.status(400).json({ errs });
        },
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
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
      const result = await this.ctrl.get(id);
      result.match(
        (registro) => {
          if (registro) {
            res.status(200).json({
              message: "Dato eliminado con éxito",
              registro,
            });
          } else {
            res.status(404).json({
              message: "No se encontró el registro",
            });
          }
        },
        (errs) => {
          res.status(400).json({ errs });
        },
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
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
      const result = await this.ctrl.getBy(req.query);
      result.match(
        (resultados) => {
          if (resultados.result.length !== 0) {
            res.status(200).json({
              message: "Busqueda realizada con éxito",
              resultados,
            });
          } else {
            res.status(404).json({
              message: "No se encontraron registros",
            });
          }
        },
        (errs) => {
          res.status(400).json({ errs });
        },
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
