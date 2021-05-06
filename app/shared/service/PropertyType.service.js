import instance from "./instanceAxios";

class PropertyTypeService {

    path = '/propertyTypes';

    getAll() {
        return instance.get(`${this.path}`);
    }
}

export default new PropertyTypeService();