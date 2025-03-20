import HttpHandler from "../../common/adapters/http.handler.js";
export default class AlojamientoHandler extends HttpHandler {
    constructor(ctrl) {
        super(ctrl);
    }
    dataFromRequest(req) {
        const { id, descripcion, banios, alberca, cocina, wifi, television, aire_acondicionado, precio_por_noche, direccion, ciudad, estado, pais, codigo_postal, latitud, longitud, } = req.body;
    }
    addEvent(req) { }
    updateEvent(req) { }
    getId(req) { }
    getByEvent(req) { }
}
