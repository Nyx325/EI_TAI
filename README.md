# Sistema tipo AirBNB

## Acerca de

### Arquitectura

El proyecto intenta hacer uso de clean architecture aunque no supe
si las rutas contaban como `adapter` y mejor le hice su propia carpeta

```
├───adapter
├───application
├───domain
│   ├───entities
│   ├───exceptions
│   ├───services
│   └───value_objects
├───implementation
└───routes
```

-**Domain:** Toda la lógica de negocio de nuestro sistema independiente
de las tecnologías usadas

- **Entities:** Las representaciones de la información a almacenar en
  el sistema
- **Exceptions:** Excepciones propias del sistema
- **Services:** Funciones o módulos encargados de la validación de tipos
  o campos específicos de ciertas entidades
- **Value objects:** Tipos de dato que representan valores, como busquedas
  paginadas
- **Application:** Todos los casos de uso de la aplicación que interactúan
  con la lógica de negocio
- **Adapter:** Funciones o módulos encargados de convertir un formato,
  tecnología o protocolo a otro, ej. convertir nuestras solicitudes http
  de express a tipos de nuestra lógica de negocio
- **Implementation:** Los módulos o instancias finales que manejan la
  lógica de negocio dadas los frameworks o librerias elegidos

## Cómo desplegar

Instalar dependencias de node en el directorio raíz del proyecto

```bash
# Para producción
npm install --omit=dev
# Para desarrollo
npm install
```

Crear un archivo `.env` en el directorio `backend/`

```
DATABASE_URL="mysql://user:password@host:3306/db_name"
PORT=3000
PAGE_SIZE=15
```

Ejecutar el proyecto

```bash
# Para producción
npm run start
# Para desarrollo
npm run dev
```
