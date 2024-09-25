import express from "express";
import { body } from "express-validator";
import { category } from "../../utils/stringConstant.js";

const validCategories = Object.values(category);
const loginUserSchema = [
  body("username_email")
    .notEmpty()
    .withMessage("Email or Username is required field"),
  body("password").notEmpty().withMessage("Password is required field"),
];

const signupUserSchema = [
  body("username")
    .notEmpty()
    .withMessage("Username is required field")
    .bail()
    .matches(/^[a-zA-Z0-9_-]{3,25}$/)
    .withMessage("Invalid username format"),
  body("name")
    .notEmpty()
    .withMessage("Name is required field")
    .bail()
    .matches(/^[a-zA-Z\s]{3,25}$/)
    .withMessage("Invalid name format"),
  body("email")
    .notEmpty()
    .withMessage("Email is required field")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required field")
    .bail()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,25}$/
    )
    .withMessage("Invalid password format"),
];

const labelSchema = [
  body("name")
    .notEmpty()
    .withMessage("Label name is required field")
    .bail()
    .matches(/^[a-zA-Z_]{1,35}$/)
    .withMessage("Invalid label format"),
];

const getLabelSchema = [
  body("name").notEmpty().withMessage("Label name is required field"),
];

const createPostSchema = [
  body("title").notEmpty().withMessage("Title is required field"),
  body("content").notEmpty().withMessage("Content is required field"),
  body("category")
    .notEmpty()
    .withMessage("Category is required field")
    .isIn(validCategories)
    .withMessage("Invalid category"),
];

const editPostSchema = [
  ...createPostSchema,
  body("postId").notEmpty().withMessage("Post Id is required field"),
];

const getPostByTitleSchema = [
  body("title").notEmpty().withMessage("Title is required field"),
];

const getPostByLabelSchema = [
  body("label").notEmpty().withMessage("Label is required field"),
];

const getPostByCategorySchema = [
  body("category").notEmpty().withMessage("Category is required field"),
];

const forgotPasswordSchema = [
  body("email")
    .notEmpty()
    .withMessage("Email is required field")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),
];

const resetPasswordSchema = [
  body("newPassword").notEmpty().withMessage("Password is required field"),
];

export {
  loginUserSchema,
  signupUserSchema,
  labelSchema,
  getLabelSchema,
  createPostSchema,
  editPostSchema,
  getPostByTitleSchema,
  getPostByLabelSchema,
  getPostByCategorySchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
