import React, { useState, useCallback, useEffect } from "react";
import { API_URL } from "../../../config";
import FieldError from "../../../models/value_objects/field.error";
import { AppView, useAppContext } from "../../AppContext";
import Alert, { AlertType } from "../../components/common/Alert";
import "./Login.css"; // Importación de los estilos

enum RegisterState {
  IDLE = "idle",
  REGISTERING = "registering",
  REGISTERED = "registered",
}

interface RegisterErrors {
  nombres?: string | string[];
  apellido_paterno?: string | string[];
  apellido_materno?: string | string[];
  email?: string | string[];
  password?: string | string[];
  fecha_nacimiento?: string | string[];
  general?: string | string[];
}

const stringifyMessage = (message: string | string[]): string => {
  return Array.isArray(message) ? message.join(", ") : message;
};

const defaultRegErr: RegisterErrors = {
  nombres: "",
  apellido_paterno: "",
  apellido_materno: "",
  email: "",
  password: "",
  fecha_nacimiento: "",
  general: "",
};
const validFields = Object.keys(defaultRegErr);

const Register: React.FC = () => {
  const { appState, setAppState } = useAppContext();

  useEffect(() => {
    if (appState.cliente) {
      setAppState((prev) => ({
        ...prev,
        view: AppView.Idle,
      }));
    }
  }, [appState.cliente]);

  const [registerState, setRegisterState] = useState(RegisterState.IDLE);
  const [credentials, setCredentials] = useState({
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    email: "",
    password: "",
    fecha_nacimiento: "",
  });

  const [errors, setErrors] = useState<RegisterErrors>({});

  const clearError = (field: keyof RegisterErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleInputChange =
    (field: keyof typeof credentials) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({ ...prev, [field]: e.target.value }));
      clearError(field);
    };

  const processApiErrors = (errors: FieldError[]) => {
    const newErrors: RegisterErrors = { ...defaultRegErr };

    console.log(validFields);
    errors.forEach(({ field, message }) => {
      const errorMessage = stringifyMessage(message);
      console.log(field);
      console.log(
        `validFields.includes(${field}: ${validFields.includes(`${field}`)}`,
      );
      if (validFields.includes(`${field}`)) {
        newErrors[field as keyof RegisterErrors] = errorMessage;
      } else {
        newErrors.general = errorMessage;
      }
    });

    setErrors(newErrors);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setRegisterState(RegisterState.REGISTERING);
      setErrors({});

      try {
        const response = await fetch(`${API_URL}/cliente`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const responseData = await response.json();

        if (!response.ok) {
          console.error(responseData);
          responseData.errs
            ? processApiErrors(responseData.errs)
            : setErrors({ general: "Error de registro" });

          setRegisterState(RegisterState.IDLE);
          return;
        }

        setRegisterState(RegisterState.REGISTERED);
      } catch (error) {
        setErrors({ general: "Error de conexión con el servidor" });
      }
    },
    [credentials],
  );

  return (
    <div className="login-container">
      <h2>Registrarse</h2>

      {errors.general && (
        <Alert
          message={stringifyMessage(errors.general)}
          type={AlertType.DANGER}
        />
      )}

      {registerState === RegisterState.REGISTERED && (
        <Alert
          message={"Registro realizado con éxito"}
          type={AlertType.SUCCESS}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder="Nombre(s)"
            value={credentials.nombres}
            onChange={handleInputChange("nombres")}
            aria-invalid={!!errors.nombres}
            required
          />
          {errors.nombres && (
            <Alert
              message={stringifyMessage(errors.nombres)}
              type={AlertType.DANGER}
            />
          )}
        </div>

        <div className="form-group">
          <input
            placeholder="Apellido Paterno"
            value={credentials.apellido_paterno}
            onChange={handleInputChange("apellido_paterno")}
            aria-invalid={!!errors.apellido_paterno}
            required
          />
          {errors.apellido_paterno && (
            <Alert
              message={stringifyMessage(errors.apellido_paterno)}
              type={AlertType.DANGER}
            />
          )}
        </div>

        <div className="form-group">
          <input
            placeholder="Apellido Materno"
            value={credentials.apellido_materno}
            onChange={handleInputChange("apellido_materno")}
            aria-invalid={!!errors.apellido_materno}
          />
          {errors.apellido_materno && (
            <Alert
              message={stringifyMessage(errors.apellido_materno)}
              type={AlertType.DANGER}
            />
          )}
        </div>

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
            <Alert
              message={stringifyMessage(errors.email)}
              type={AlertType.DANGER}
            />
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
            <Alert
              message={stringifyMessage(errors.password)}
              type={AlertType.DANGER}
            />
          )}
        </div>

        <div className="form-group">
          <input
            type="date"
            placeholder="Contraseña"
            value={credentials.fecha_nacimiento}
            onChange={handleInputChange("fecha_nacimiento")}
            aria-invalid={!!errors.fecha_nacimiento}
            required
          />
          {errors.fecha_nacimiento && (
            <Alert
              message={stringifyMessage(errors.fecha_nacimiento)}
              type={AlertType.DANGER}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={registerState === RegisterState.REGISTERING}
          aria-busy={registerState === RegisterState.REGISTERING}
        >
          {registerState === RegisterState.REGISTERING
            ? "Cargando..."
            : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default Register;
