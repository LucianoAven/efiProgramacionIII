import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "primereact/button";

export const ProtectedButton = ({ allowedRole, ...props }) => {
  const { user } = useContext(AuthContext);

  if (!user || !allowedRole?.includes(user.rol)) {
    return null;
  }

    return <Button {...props} />;
}
