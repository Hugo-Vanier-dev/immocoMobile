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

    getByUserAndDate(userId, date){
        const params = {
            date: date
        }
        return instance.get(`${this.path}/users/${userId}/date`, {params: params});
    }

    getByClient(clientId) {
        return instance.get(`${this.path}/clients/${clientId}`);
    }

    getNextRdv(userId){
        return instance.get(`${this.path}/users/${userId}/next`);
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