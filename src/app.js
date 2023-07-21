import express from 'express';
// morgan nos permite ver por consola las peticiones que se le hacen a nuestro backend.
import morgan from 'morgan';

//Aqui importamos nuestras rutas
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

import cookieParser from 'cookie-parser';



// Inicializamos express, guardandolo en una constante app.
const app = express();

//iniciamos morgan
app.use(morgan('dev'));

//esto se usa par aque express pueda entender los objetos.
// Y el cookie parser es para que nos regren las cookies como json
app.use(express.json());
app.use(cookieParser());


// Aqui inicializamos nuestras rutas
app.use('/api', authRoutes);
app.use('./api', taskRoutes);


export default app;