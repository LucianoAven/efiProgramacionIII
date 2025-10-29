import api from "./api";

const schedulesService = {

    listPaged: ({ page = 1, limit = 10, q = '' }) => api.get('horarios', { params: { page, limit, q } }),
    list: (params = {}) => api.get('horarios', { params }),
    get: (id) => api.get(`horarios/${id}`),
    create: (payload) => api.post('horarios', payload),
    update: (id, payload) => api.put(`horarios/${id}`, payload),
    remove: (id) => api.delete(`horarios/${id}`)
}

export default schedulesService
