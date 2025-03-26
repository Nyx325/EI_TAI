# Sistema tipo AirBNB

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
npm run migrate-deploy
npm run start
# Para desarrollo
npm run migrate-dev
npm run dev
```

## TODO

- [ ] Corregir validacion de zod dentro del controlador en los controladores
      existentes
- [ ] Corregir script de migracion cada que se ejecuta `dev`
