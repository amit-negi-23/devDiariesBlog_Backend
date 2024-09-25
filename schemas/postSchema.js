import mongoose from "mongoose";
import { Schema } from "mongoose";
import  paginate from "mongoose-paginate-v2";
import { category, comment_options } from "../utils/stringConstant.js";

const schema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enums: [
        category.DEVELOPMENT,
        category.PROGRAMMING_LANGUAGE,
        category.TECHNOLOGY,
        category.DEVOPS,
        category.CLOUD,
        category.CAREER_AND_GROWTH,
        category.TOOLS,
        category.OTHERS,
      ],
    },
    labels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Label",
      },
    ],
    comment_options: {
      type: String,
      enum: [
        comment_options.ALLOW,
        comment_options.SHOW_EXISTING,
        comment_options.HIDE_EXISTING,
      ],
      default: comment_options.ALLOW,
    },
    // createdAt:{ type: String, required: true},
    // updatedAt:{ type: String, required: true}
  },
  { timestamps: true }
);

schema.plugin(paginate);
export const Post = mongoose.model("Post", schema);
