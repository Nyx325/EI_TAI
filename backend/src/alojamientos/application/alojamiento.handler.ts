import { Request } from "express";
import HttpHandler from "../../common/adapters/http.handler.js";
import AlojamientoCriteria from "../domain/entities/alojamiento.criteria.js";
import Alojamiento from "../domain/entities/alojamiento.js";
import NewAlojamiento from "../domain/entities/new.alojamiento.js";
import Controller from "../../common/application/controller.js";

export default class AlojamientoHandler extends HttpHandler<
  Alojamiento,
  NewAlojamiento,
  number,
  AlojamientoCriteria
> {
  constructor(
    ctrl: Controller<Alojamiento, NewAlojamiento, number, AlojamientoCriteria>,
  ) {
    super(ctrl);
  }

  protected addEvent(req: Request): NewAlojamiento {}

  protected updateEvent(req: Request): Alojamiento {}

  protected getId(req: Request): number {}

  protected getByEvent(req: Request): {
    criteria: AlojamientoCriteria;
    page: number;
  } {}
}
