import instance from "./instanceAxios";

class HeaterTypeService {

    path = '/heaterTypes';

    getAll() {
        return instance.get(`${this.path}`);
    }
}

export default new HeaterTypeService();