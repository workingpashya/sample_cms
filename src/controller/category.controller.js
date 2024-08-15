import createError from "http-errors";
import { Category } from "./../model/category.model.js";
import _ from "lodash";
import moment from "moment-timezone";
import { Post } from "../model/post.model.js";

/**
 * method returns the details of specified category id
 */
const getCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    let doc = await Category.findById(id);
    res.status(200).json(doc);
  } catch (error) {
    return next(createError.InternalServerError(error.message));
  }
};

/**
 * method returns the limited details of all category
 * to show list on frontend
 */
const getAllCategory = async (req, res, next) => {
  try {
    let docs = await Category.find().select("name createdAt");
    res.status(200).send({ records: docs });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

/**
 * method allows users to add category
 */
const addCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (_.isEmpty(name))
      return next(createError.BadRequest("Name of category is mandatory"));

    if (_.isEmpty(description))
      return next(
        createError.BadRequest("Description of a category is required")
      );

    let existingDoc = await Category.findOne({ name });

    if (_.isEmpty(existingDoc) === false)
      return next(
        createError.BadRequest(
          "Category with the provided name already exists in DB"
        )
      );

    Category.create({ name, description, createdAt: moment.now() });

    res.status(200).send({ message: "Record created successfully" });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

/**
 * method allows user to update the category
 */
const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;

    let doc = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (_.isEmpty(doc))
      return next(
        createError.NotFound("Record with provided id does not found")
      );

    res.status(200).send({ message: "Record updated successfully" });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

/**
 * method allows user to delete category
 */
const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;

    let postDoc = await Post.findOne({ category: id }).select("_id");

    // here we check if category is already associated with any post
    // if it is associated with any post then we can't delete category
    if (_.isEmpty(postDoc) === false)
      return next(
        createError.BadRequest("Can not delete as it is associated with a post")
      );

    let doc = await Category.findByIdAndDelete(id);
    if (_.isEmpty(doc))
      return next(
        createError.NotFound("Record with provided id does not exist")
      );

    res.status(200).send({ message: "Record deleted successfully" });
  } catch (error) {
    next(createError.InternalServerError(error.message));
  }
};

export {
  getCategory,
  getAllCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
