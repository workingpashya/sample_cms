import createError from "http-errors";
import { Post } from "./../model/post.model.js";
import _ from "lodash";
import { Category } from "../model/category.model.js";
/**
 * Method returns all details of specified post id
 */
const getPost = async (req, res, next) => {
  try {
    const id = req.params.id;
    let doc = await Post.findById(id);
    res.status(200).json(doc);
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

/**
 * Method returns partial details of all posts
 * to show list on frontend
 */
const getAllPost = async (req, res, next) => {
  try {
    let records = await Post.find()
      .populate("category", "_id name")
      .select("_id title category createdAt updatedAt");
    res.status(200).send({ records });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

/**
 * Method allows user to add post
 */
const addPost = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    if (_.isEmpty(title))
      return next(createError.BadRequest("Title of post is required"));
    if (_.isEmpty(content))
      return next(createError.BadRequest("Content of post is required"));
    if (_.isEmpty(category))
      return next(createError.BadRequest("Category of post is required"));

    let dbCategory = await Category.findById(category);
    if (_.isEmpty(dbCategory))
      return next(createError.BadRequest("Provided category does not exist"));

    Post.create({
      title,
      content,
      category,
    });

    res.status(200).send({ message: "Record added successfully" });
  } catch (error) {
    return next(createError.InternalServerError(error.message));
  }
};

/**
 * Method allows user to update post
 */
const updatePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, content, category } = req.body;

    if (_.isEmpty(title))
      return next(createError.BadRequest("Title of post is required"));
    if (_.isEmpty(content))
      return next(createError.BadRequest("Content of post is required"));
    if (_.isEmpty(category))
      return next(createError.BadRequest("Category of post is required"));

    let dbCategory = await Category.findById(category);
    if (_.isEmpty(dbCategory))
      return next(createError.BadRequest("Provided category does not exist"));

    let doc = await Post.findByIdAndUpdate(
      id,
      { title, content, category },
      { new: true }
    );

    if (_.isEmpty(doc))
      return next(
        createError.NotFound("Record with provided id does not exist")
      );

    res.status(200).send({ message: "Record updated successfully" });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

/**
 * Method allows user to delete post
 */
const deletePost = async (req, res, next) => {
  try {
    const id = req.params.id;
    let doc = await Post.findByIdAndDelete(id);
    if (_.isEmpty(doc))
      return next(
        createError.NotFound("Record with provided id does not exist")
      );

    res.status(200).send({ message: "Record deleted successfully" });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

export { getPost, getAllPost, addPost, updatePost, deletePost };
