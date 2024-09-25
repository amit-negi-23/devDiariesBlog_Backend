import { populate } from "dotenv";
import { Post } from "../schemas/postSchema.js";

const createNewPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = new Post(data);
      const newPost = await post.save();
      resolve(newPost);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUserPosts = (userId, page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: { updatedAt: -1 },
        populate: [{ path: "labels" }],
      };

      const result = await Post.paginate({ userId: userId }, options);

      resolve({
        totalPosts: result.totalDocs,
        totalPages: result.totalPages,
        currentPage: result.page,
        existedPosts: result.docs,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const removePost = (postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error("Post doesn't exist");
      } else {
        // const deletedPost= await Post.findByIdAndDelete(postId)
        const deletedPost = await Post.deleteOne({ _id: postId });
        // console.log(deletedPost)
        resolve(deletedPost);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updatePost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await Post.findById(data.postId);
      if (!post) {
        throw new Error("Post doesn't exist");
      } else {
        const updatedPost = await Post.updateOne(
          { _id: data.postId },
          {
            title: data.title,
            content: data.content,
            labels: data.labels,
            comment_options: data.comment_options,
            category: data.category,
            // updatedAt: data.updatedAt,
          }
        );
        // console.log(updatedPost)
        resolve(updatedPost);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getPostsByTitle = (data, page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Remove spaces from the search term
      const allowedSpacesTitle = data.title.replace(/\s+/g, "");
      // const escapedTerm = escapeRegExp(cleanSearchTerm);

      // Create a regex pattern that allows for any characters between each character of the search term
      const regexPattern = allowedSpacesTitle.split("").join(".*");
      const regex = new RegExp(regexPattern, "i");

      // const regex = new RegExp(`${data.title}`, 'i');

      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: { updatedAt: -1 },
        populate: [{ path: "labels" }],
      };
      const result = await Post.paginate(
        {
          userId: data.userId,
          title: { $regex: regex },
        },
        options
      );
      // console.log(result.totalDocs)

      resolve({
        totalPostsByTitle: result.totalDocs,
        totalPages: result.totalPages,
        currentPage: result.page,
        existedPostsByTitle: result.docs,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUsedLabelsByUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(userId)
      const userLabels = await Post.aggregate([
        { $match: { userId: userId } },
        { $unwind: "$labels" },
        { $group: { _id: null, userLabels: { $addToSet: "$labels" } } },
        { $project: { _id: 0, userLabels: 1 } },
      ]);

      // console.log(userLabels);
      resolve(userLabels.length ? userLabels[0].userLabels : []);
    } catch (error) {
      // console.error('Error fetching unique labels:', error);
      reject(error);
    }
  });
};

const searchPostByLabel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      const offset = (page - 1) * limit;

      // Perform aggregation
      const aggregationPipeline = [
        { $match: { userId: data.userId, labels: data.label } },
        { $sort: { updatedAt: -1 } },
        { $skip: offset },
        { $limit: limitNum },
      ];

      const totalPostsByLabel = await Post.countDocuments({
        userId: data.userId,
        labels: data.label,
      });

      const postsByLabel = await Post.aggregate(aggregationPipeline);

      // Calculate total pages
      const totalPages = Math.ceil(totalPostsByLabel / limitNum);

      resolve({
        totalPostsByLabel: totalPostsByLabel,
        totalPages: totalPages,
        currentPage: pageNum,
        existedPostsByLabel: postsByLabel,
      });
    } catch (error) {
      // console.error("Error searching posts by label:", error);
      reject(error);
    }
  });
};

const getAllPosts = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: { updatedAt: -1 },
      };
      const result = await Post.paginate({}, options);
      // console.log(result);
      resolve({
        totalPosts: result.totalDocs,
        totalPages: result.totalPages,
        currentPage: result.page,
        existedPosts: result.docs,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getPostsByCategory = (data, page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: { updatedAt: -1 },
      };
      const result = await Post.paginate(
        {
          category: data.category,
        },
        options
      );

      resolve({
        totalPostsByCategory: result.totalDocs,
        totalPages: result.totalPages,
        currentPage: result.page,
        existedPostsByCategory: result.docs,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export {
  createNewPost,
  getAllUserPosts,
  removePost,
  updatePost,
  getPostsByTitle,
  getAllUsedLabelsByUser,
  searchPostByLabel,
  getAllPosts,
  getPostsByCategory,
};
