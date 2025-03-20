import Controller from "./http.controller.js";
export default class AlojamientoController extends Controller {
    constructor(repo) {
        super(repo);
    }
    add(newData) {
        return this.repo.add(newData);
    }
    update(data) {
        return this.repo.update(data);
    }
    delete(id) {
        return this.repo.delete(id);
    }
    get(id) {
        return this.repo.get(id);
    }
    getBy(data) {
        return this.repo.getBy(criteria, page);
    }
}
