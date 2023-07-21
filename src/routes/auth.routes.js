import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";

/**
 * Acá Importamos la función validateSchema que creamos en nuestos middlewares.
 * A esta función le pasamos como parametros los schemas que creamos en auth.schemas, tanto para
 * la ruta para registrarse como para logearse. 
 */
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

// Router me trae un objeto, qeu lo guardo en una constante router, para usarlo más fácil.
const router = Router();

/**aqui uso router con su metodo post.
 * traigo las funciones creadeas en controllers para cada ruta.
 * tambiens los middlewares y los schemas creados para validar los datos que entraran a nuestro back
 */
router.post('/register', validateSchema(registerSchema), register);
router.post('/login',  validateSchema(loginSchema), login);
router.post('/logout', logout);

export default router;