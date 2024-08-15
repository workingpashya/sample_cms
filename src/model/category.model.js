import mongoose from "mongoose";
import { MODEL_CATEGORY } from "../utils/constants.js";
import _ from "lodash";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
  },
});

/**
 * method is called when we send record details in the api response
 * and this method ensures what fields needs to sent in response
 */
categorySchema.methods.toJSON = function () {
  let category = this;
  let categoryObj = category.toObject();
  let data = _.pick(categoryObj, ["_id", "name", "description", "createdAt"]);
  return data;
};

const Category = mongoose.model(MODEL_CATEGORY, categorySchema);
export { Category };
