import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";
import { getTask, getTasks, updateTask, deleteTask, createTask } from "../controllers/task.controller";

const router = Router();

router.get('/task', authRequired, getTasks);
router.get('/task/:id', authRequired, getTask);
router.post('/task', authRequired, createTask);
router.delete('/task/:id', authRequired, deleteTask);
router.put('/task/:id', authRequired, updateTask);

export default router;