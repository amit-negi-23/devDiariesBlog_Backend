import { Router } from "express";
import { createPostSchema, editPostSchema,getPostByTitleSchema, getPostByLabelSchema, getPostByCategorySchema } from '../schemas/utils/validationSchema.js';
import { validationHandler } from '../middlewares/validationHandler.js';
import { createPost, deletePost,editPost, getPostByTitle, getAllLabelsUsedByUser, getPostByLabel, getAllPost,getPostByCategory, getAllUserPost } from "../controllers/postController.js";
import { authenticateToken } from "../middlewares/authentication.js";

const router = Router();

router.route("/create-post").post(createPostSchema,validationHandler,authenticateToken,createPost);
router.route("/get-post").get(authenticateToken,getAllUserPost);
router.route("/update-post").put(editPostSchema,validationHandler,authenticateToken,editPost);
router.route("/delete-post").delete(authenticateToken,deletePost);
router.route("/get-post-title").post(getPostByTitleSchema,validationHandler,authenticateToken,getPostByTitle);
router.route("/get-all-labels-user").get(authenticateToken,getAllLabelsUsedByUser);
router.route("/get-post-label").post(getPostByLabelSchema,validationHandler,authenticateToken,getPostByLabel);
router.route("/get-all-post").get(getAllPost);
router.route("/get-post-category").post(getPostByCategorySchema,validationHandler,getPostByCategory);


export default router;
