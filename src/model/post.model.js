import mongoose from "mongoose";
import { MODEL_CATEGORY, MODEL_POST } from "../utils/constants.js";
import moment from "moment-timezone";
import _ from "lodash";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: MODEL_CATEGORY,
    require: true,
  },
  createdAt: {
    type: Number,
  },
  updatedAt: {
    type: Number,
  },
});

/**
 * method get's called when document is created first time
 * so we will set createdAt & updatedAt time here
 */
postSchema.pre("save", function (next) {
  this.createdAt = moment.now();
  this.updatedAt = moment.now();
  next();
});

/**
 * method get's called when document is updated
 * so we will update the updatedAt time here
 */
postSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = moment.now();
  next();
});

/**
 * method is called when we send record details in the api response
 * and this method ensures what fields needs to sent in response
 */
postSchema.methods.toJSON = function () {
  let post = this;
  let postObj = post.toObject();
  let data = _.pick(postObj, [
    "_id",
    "title",
    "content",
    "category",
    "createdAt",
    "updatedAt",
  ]);
  return data;
};

const Post = mongoose.model(MODEL_POST, postSchema);
export { Post };
