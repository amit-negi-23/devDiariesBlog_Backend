import { Router } from "express";
import {createLabel,getAllLabel,getLabelByName} from '../controllers/labelController.js'
import { labelSchema,getLabelSchema } from '../schemas/utils/validationSchema.js';
import { validationHandler } from '../middlewares/validationHandler.js';

const router = Router();

router.route("/create-label").post(labelSchema,validationHandler,createLabel);
router.route("/get-all-label").get(getAllLabel);
router.route("/get-label").post(getLabelSchema,validationHandler,getLabelByName);

export default router;
