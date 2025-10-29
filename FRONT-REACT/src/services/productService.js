import api from "./api";

const employeeService = {

    listPaged: ({ page = 1, limit = 10, q = '' }) => api.get('empleados', { params: { page, limit, q } }),
    list: () => api.get('empleados'),
    get: (id) => api.get(`empleados/${id}`),
    create: (payload) => api.post('empleados', payload),
    update: (id, payload) => api.put(`empleados/${id}`, payload),
    remove: (id) => api.delete(`empleados/${id}`)
}

export default employeeService
