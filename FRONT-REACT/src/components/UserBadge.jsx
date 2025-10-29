import { useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function UserBadge() {
  const { user } = useContext(AuthContext);

  const nombre = user?.name ?? 'Usuario';
  const rol = useMemo(() => {
    const r = String(user?.rol || '').toLowerCase();
    return r ? r.charAt(0).toUpperCase() + r.slice(1) : 'Sin rol';
  }, [user?.rol]);

  // Solo mostrar si hay sesión iniciada
  if (!user) return null;

  return (
    <div className="user-badge">
      <div className="user-badge__name"><b>Usuario: {nombre}</b></div>
      <div className="user-badge__role"><b>Rol: {rol}</b></div>
    </div>
  );
}
