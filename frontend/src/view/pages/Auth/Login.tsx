// src/pages/Login.tsx
import React, { useState, useCallback, useEffect } from "react";
import { API_URL } from "../../../config";
import Alert, { AlertType } from "../../components/common/Alert";
import "./Login.css"; // Importación de los estilos
import FieldError from "../../../models/value_objects/field.error";
import { AppView, useAppContext } from "../../AppContext";
import { Cliente } from "../../../models/entities/cliente";

enum LoginState {
  IDLE = "idle",
  LOGGIN_IN = "loggin_in",
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

const Login: React.FC = () => {
  const { appState, setAppState } = useAppContext();

  useEffect(() => {
    if (appState.cliente) {
      setAppState((prev) => ({
        ...prev,
        view: AppView.Idle,
      }));
    }
  }, [appState.cliente]);

  const [loginState, setLoginState] = useState(LoginState.IDLE);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});

  const clearError = (field: keyof LoginErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleInputChange =
    (field: keyof typeof credentials) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({ ...prev, [field]: e.target.value }));
      clearError(field);
    };

  const processApiErrors = (errors: FieldError[]) => {
    const newErrors: LoginErrors = {};

    errors.forEach(({ field, message }) => {
      const errorMessage = Array.isArray(message)
        ? message.join(", ")
        : message;

      switch (field) {
        case "email":
          newErrors.email = errorMessage;
          break;
        case "password":
          newErrors.password = errorMessage;
          break;
        default:
          newErrors.general = errorMessage;
      }
    });

    setErrors(newErrors);
  };

  const login = ({ fecha_nacimiento, ...restC }: Cliente) => {
    setAppState((prev) => ({
      ...prev,
      cliente: {
        ...restC,
        fecha_nacimiento: new Date(fecha_nacimiento),
      },
    }));
  };

  const handleLoginSuccess = (userData: Cliente) => {
    const { id, tipo, ...restUser } = userData;

    login({
      ...restUser,
      id: Number(id),
      tipo: Number(tipo),
    });

    setAppState((prev) => ({ ...prev, view: AppView.Idle }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoginState(LoginState.LOGGIN_IN);
      setErrors({});

      console.log("A");
      try {
        console.log("B");
        console.log(`${API_URL}/login`);
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        console.log("C");

        const responseDataText = await response.text();
        console.log(responseDataText);
        const responseData = JSON.parse(responseDataText);
        console.log("D");

        if (!response.ok) {
          responseData.errors
            ? processApiErrors(responseData.errors)
            : setErrors({ general: "Error de autenticación" });
          return;
        }

        handleLoginSuccess(responseData);
      } catch (error) {
        setErrors({ general: "Error de conexión con el servidor" });
      } finally {
        setLoginState(LoginState.IDLE);
      }
    },
    [credentials, login],
  );

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

      {errors.general && (
        <Alert message={errors.general} type={AlertType.DANGER} />
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={credentials.email}
            onChange={handleInputChange("email")}
            aria-invalid={!!errors.email}
            required
          />
          {errors.email && (
            <Alert message={errors.email} type={AlertType.DANGER} />
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={handleInputChange("password")}
            aria-invalid={!!errors.password}
            required
          />
          {errors.password && (
            <Alert message={errors.password} type={AlertType.DANGER} />
          )}
        </div>

        <button
          type="submit"
          disabled={loginState === LoginState.LOGGIN_IN}
          aria-busy={loginState === LoginState.LOGGIN_IN}
        >
          {loginState === LoginState.LOGGIN_IN
            ? "Autenticando..."
            : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;
