import api from "./api";

const scheduleRequestsService = {

    listPaged: ({ page = 1, limit = 10, q = '' }) => api.get('solicitudes-horarios', { params: { page, limit, q } }),
    list: () => api.get('solicitudes-horarios'),
    myRequests: () => api.get('solicitudes-horarios/mis-solicitudes'),
    get: (id) => api.get(`solicitudes-horarios/${id}`),
    create: (payload) => api.post('solicitudes-horarios', payload),
    update: (id, payload) => api.put(`solicitudes-horarios/${id}`, payload),
}

export default scheduleRequestsService
