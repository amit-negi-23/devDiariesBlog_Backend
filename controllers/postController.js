import {
  apiResponseSuccess,
  apiResponseErr,
  apiResponsePagination,
} from "../middlewares/apiResponse.js";
import {
  createNewPost,
  getAllUserPosts,
  removePost,
  updatePost,
  getPostsByTitle,
  getAllUsedLabelsByUser,
  searchPostByLabel,
  getAllPosts,
  getPostsByCategory,
} from "../repository/postRepository.js";
const createPost = async (req, res) => {
  try {
    let data = req.body;
    data.userId = req.user.id;
    //  console.log(req.body);
    const result = await createNewPost(data);
    return res
      .status(201)
      .send(apiResponseSuccess([], true, 201, "Post created successfully"));
  } catch (error) {
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
};

const getAllUserPost = async (req, res) => {
  try {
    let userId = req.user.id;
    // console.log(req.body.userId)
    const { page, limit } = req.query
    // const offset = page && limit ? (page - 1) * parseInt(limit, 10) : null

    let { totalPosts, totalPages, currentPage, existedPosts }  = await getAllUserPosts(userId,page, limit);
    let pagination = {
      page: currentPage,
      totalPages: totalPages,
      totalItems: totalPosts,
  }
  // console.log(pagination)

    return res
      .status(200)
      .send(
        apiResponseSuccess(existedPosts, true, 200, "Posts retrieved successfully",pagination)
      );
  } catch (error) {
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
};

const deletePost = async (req, res) => {
  try {
    let { postId } = req.query;
    let result = await removePost(postId);
    return res
      .status(200)
      .send(apiResponseSuccess({}, true, 200, "Post deleted successfully"));
  } catch (error) {
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
};

const editPost = async (req, res) => {
  try {
    let data = req.body;
    // console.log(data);
    let result = await updatePost(data);
    return res
      .status(200)
      .send(apiResponseSuccess({}, true, 200, "Post updated successfully"));
  } catch (error) {
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
};

const getPostByTitle = async (req, res) => {
  try {
    let data = req.body;
    data.userId = req.user.id;
    const { page, limit } = req.query

    let { totalPostsByTitle, totalPages, currentPage, existedPostsByTitle }  = await getPostsByTitle(data,page, limit);
    let pagination = {
      page: currentPage,
      totalPages: totalPages,
      totalItems: totalPostsByTitle,
  }

    // let result = await getPostsByTitle(data);

    return apiResponsePagination(
      existedPostsByTitle,
      true,
      200,
      "Retrieved post by title successfully",
      pagination,
      res
    );

    // return apiResponseSuccess(
    //   result,
    //   true,
    //   200,
    //   "Retrieved post by title successfully",
    //   res
    // );
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res);
  }
};

const getAllLabelsUsedByUser = async (req, res) => {
  try {
    let userId = req.user.id;
    // console.log(req.body.userId)
    let result = await getAllUsedLabelsByUser(userId);
    // return apiResponseSuccess(
    //   result,
    //   true,
    //   200,
    //   "Labels Used by User retrieved successfully",
    //   res
    // );
    return res
      .status(200)
      .send(
        apiResponseSuccess(result, true, 200, "Labels Used by User retrieved successfully")
      );
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res);
  }
};

const getPostByLabel = async (req, res) => {
  try {
    let data = req.body;
    data.userId = req.user.id;
    // console.log(data);
    const { page, limit } = req.query

    let { totalPostsByLabel, totalPages, currentPage, existedPostsByLabel }  = await searchPostByLabel(data,page, limit);
    let pagination = {
      page: currentPage,
      totalPages: totalPages,
      totalItems: totalPostsByLabel,
  }

    // let result = await searchPostByLabel(data);
    return apiResponsePagination(
      existedPostsByLabel,
      true,
      200,
      "Retrieved post by label successfully",
      pagination,
      res
    );

    // return apiResponseSuccess(
    //   result,
    //   true,
    //   200,
    //   "Post retrieved by label successfully",
    //   res
    // );
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res);
  }
};

const getAllPost=async(req,res)=>{
  try{
    // let data = req.body;
    const { page, limit } = req.query
  
    let { totalPosts, totalPages, currentPage, existedPosts }  = await getAllPosts(page, limit);
    let pagination = {
      page: currentPage,
      totalPages: totalPages,
      totalItems: totalPosts,
  }
    return apiResponsePagination(
      existedPosts,
      true,
      200,
      "Retrieved all posts successfully",
      pagination,
      res
    );
      
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res)
  }
}


const getPostByCategory=async (req,res)=>{
  try{
  let data = req.body;
  const { page, limit } = req.query

  let { totalPostsByCategory, totalPages, currentPage, existedPostsByCategory }  = await getPostsByCategory(data,page, limit);
  let pagination = {
    page: currentPage,
    totalPages: totalPages,
    totalItems: totalPostsByCategory,
}
  return apiResponsePagination(
    existedPostsByCategory,
    true,
    200,
    "Retrieved post by category successfully",
    pagination,
    res
  );
    
} catch (error) {
  return apiResponseErr(null, false, 400, error.message, res)
}
}

export {
  createPost,
  getAllUserPost,
  deletePost,
  editPost,
  getPostByTitle,
  getAllLabelsUsedByUser,
  getPostByLabel,
  getAllPost,
  getPostByCategory
};
