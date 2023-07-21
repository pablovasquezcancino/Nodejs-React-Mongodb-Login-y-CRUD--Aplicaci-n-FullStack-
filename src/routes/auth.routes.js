import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller";

// Router me trae un objeto, qeu lo guardo en una constante router, para usarlo más fácil.
const router = Router();

/**aqui uso router con su metodo post.
 * traigo las funciones creadeas en controllers para cada ruta.
 */
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;