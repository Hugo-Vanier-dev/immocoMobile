import instance from './instanceAxios';

class AppointmentService {

    path = '/appointments';

    get(id) {
        return instance.get(`${this.path}/${id}`);
    }

    getByUser(userId, dateStart, dateEnd) {
        const params = {
            dateStart: dateStart,
            dateEnd: dateEnd
        }
        return instance.get(`${this.path}/users/${userId}`, {params: params});
    }

    getByClient(clientId) {
        return instance.get(`${this.path}/clients/${clientId}`);
    }

    create(data) {
        return instance.post(`${this.path}`, data);
    }

    update(id, data) {
        return instance.put(`${this.path}/${id}`, data);
    }

    delete(id) {
        return instance.delete(`${this.path}/${id}`);
    }
    
}

export default new AppointmentService();