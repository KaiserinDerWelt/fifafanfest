# 🏆 FIFA Fan Fest — México vs Sudáfrica · Mundial 2026

Landing page interactiva para el Fan Fest oficial de la FIFA para el partido México vs Sudáfrica del 11 de junio de 2026.
Prueba de tecnica para el puesto de Desarrollador Web - Mexico. MLA.

## Demo
[https://fifafanfest.vercel.app](https://fifafanfest.vercel.app)

## 📁 Estructura del proyecto

```
fifafanfest/
├── frontend/          # React + Vite
│   └── src/
│       └── App.jsx
└── backend/           # Node.js + Express
    ├── index.js       # Servidor y rutas
    ├── db.js          # Conexión MySQL
    ├── schema.sql     # Estructura de la BD
    └── .env.example
```

## Frontend

- React + Vite.
- 3 secciones: Hero animado, Info del evento, Galería + Formulario.
- Temporizador de 5 minutos para el registro.
- Animaciones de entrada y scroll reveal.
- Responsivo, moderno, futbolero.

## Backend

- Node.js + Express.
- MySQL2 para la base de datos.
- Express-validator para validaciones.
- CORS habilitado.

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/registro` | Guarda un registro nuevo |
| GET | `/api/registros` | Lista todos los registros |

## 🗄 Base de datos

```sql
CREATE TABLE registros (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  telefono    VARCHAR(20)  NOT NULL,
  mensaje     TEXT,
  creado_en   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Correr localmente

### Base de datos
```bash
mysql -u root -p < backend/schema.sql
```

### Backend
```bash
cd backend
cp .env.example .env
# Edita .env con tus credenciales de MySQL
npm install
node index.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Variables de entorno

Crea un archivo `.env` en `/backend` basado en `.env.example`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=fifafanfest
PORT=3001
```

## Tecnologias usadas

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Base de datos | MySQL |
| Validaciones | express-validator |
| Deploy frontend | Vercel |

## Esta es otra creacion de KaiserinDerWelt. Another codebase from KaiserinDerWelt. Sigueme en X. Follow me. X:KaiserinDrWelt.