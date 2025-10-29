import api from "./api";

const usersService = {
    // Rutas de usuarios
    list: () => api.get('usuarios'),
    getProfile: () => api.get('usuarios/profile'),
    update: (id, payload) => api.put(`usuarios/${id}`, payload),
}

export default usersService