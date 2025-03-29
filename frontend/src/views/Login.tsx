// src/pages/Login.tsx
import React, { useEffect, useState } from "react";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import JsonError from "../models/value_objects/json.error";
import Alert, { AlertType } from "../components/Alert";

enum LoginState {
  IDLE = "idle",
  LOGGIN_IN = "loggin_in",
  SUCCESS = "success",
  ERROR = "error",
}

const Login: React.FC = () => {
  const { login } = useUser(); // Hook para manejar el contexto de usuario
  const navigate = useNavigate();

  // Estado para los campos del formulario
  const [loginState, setLoginState] = useState(LoginState.IDLE);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErr] = useState<string | undefined>(undefined);
  const [passwordErr] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<JsonError[]>([]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita el refresco de la página
    setLoginState(LoginState.LOGGIN_IN);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      console.log(`Code: ${response.status}`);
      console.log(`Email: ${email}`);
      console.log(`Pwd: ${password}`);

      if (!response.ok) {
        if (responseData.errors) {
          setErrors(responseData.errors);
        } else {
          setErrors([{ field: "general", message: "Error de autenticación" }]);
        }
        setLoginState(LoginState.ERROR);
        return;
      }

      const userData = await response.json(); // Obtiene la respuesta en formato JSON
      const {
        apellido_paterno,
        apellido_materno,
        fecha_nacimiento,
        ...restUser
      } = userData;

      // Guarda la información del usuario en el contexto
      login({
        ...restUser,
        apellidoP: apellido_paterno,
        apellidoM: apellido_materno,
        fechaNacimiento: fecha_nacimiento,
      });

      // Redirige a la página principal
      navigate("/");
    } catch (error: any) {
      setLoginState(LoginState.ERROR);
    }
  };

  useEffect(() => {
    setErrors(errors.filter((err) => err.field !== "email"));
  }, [emailErr]);

  useEffect(() => {
    setErrors(errors.filter((err) => err.field !== "password"));
  }, [passwordErr]);

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        {emailErr && <Alert message={emailErr} type={AlertType.WARNING} />}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {passwordErr && (
          <Alert message={passwordErr} type={AlertType.WARNING} />
        )}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loginState === LoginState.LOGGIN_IN}>
          {loginState === LoginState.LOGGIN_IN
            ? "Cargando..."
            : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;
