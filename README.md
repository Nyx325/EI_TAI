# Sistema tipo AirBNB

## Cómo desplegar

Instalar dependencias de node en el directorio raíz del proyecto

```bash
# Para producción
npm run install-all
```

Crear un archivo `.env` en el directorio `backend/`

```
DATABASE_URL="mysql://user:password@host:3306/db_name"
PORT=3000
PAGE_SIZE=15
```

Crear un archivo `.env` en el directorio `frontend`

```
REACT_APP_API_URL="http://localhost:3001"
```

Ejecutar el proyecto

```bash
# Para producción
npm run migrate-deploy
npm run start
# Para desarrollo
npm run migrate-dev
npm run dev
```

```
$2b$10$5OYXU1igxpaEFQPAkj6Btu9DBjGDyPXiyJk/Ksgz4BrHa19B89/cm 
```