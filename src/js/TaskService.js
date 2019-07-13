import axios from 'axios';

const url = 'http://localhost:5000/api/tasks/';

export default class TaskService {
    static getTasks() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(task => ({
                        ...task,
                        createdAt: new Date(task.createdAt)
                    }))
                );
            } catch(err) {
                reject(err)
            }
        });
    }


    static insertTask(data) {
        return axios.post(url, { 
            data
        });
    }

    static removeTask(id) {
        return axios.delete(`${url}${id}`);
    }

    static updateTask(id, doneStatus) {
        return axios.put(`${url}${id}`, {doneStatus});
    }

}