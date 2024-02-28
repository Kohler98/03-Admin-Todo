# Development
Pasos para levantar la app en desarrollo

1. levantar la base de datos
```
docker compose up -d
```

2. Renombrar la .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ``` npm install ```
5. Ejecutar el comando ``` npm run dev ```
6. Ejecutar el Seed para [crear la base de datos](http://localhost:3000/api/seed)
## NOTA Usuario por defecto
__usuario:__ test1@user.com
__password:__ 123456
# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```



# Prod

# Stage