import mongoose from "mongoose";

import { UserAttrs } from "./user";
import { ArticleAttrs } from "./article";

/**
 * Creation Requirements
 */
interface ImageAttrs {
  Key: string;
  fileType: string;
  ownerId: mongoose.PopulatedDoc<UserAttrs & Document>;
  articleId: mongoose.PopulatedDoc<ArticleAttrs & Document>;
}

interface ImageDoc extends mongoose.Document {
  Key: string;
  fileType: string;
  ownerId: mongoose.PopulatedDoc<UserAttrs & Document>;
  articleId: mongoose.PopulatedDoc<ArticleAttrs & Document>;
  createdAt: Date;
}

interface ImageModel extends mongoose.Model<ImageDoc> {
  build(attrs: ImageAttrs): ImageDoc;
}

const imageSchema = new mongoose.Schema(
  {
    Key: { required: true, type: String, unique: true },
    fileType: { required: true, type: String },
    createdAt: { type: Date, default: new Date() },
    ownerId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    articleId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

imageSchema.statics.build = (attrs: ImageAttrs) => {
  return new Image(attrs);
};

imageSchema.virtual("imageUrl").get(function (doc: { Key: string }) {
  return "https://cdn.pulth.com/" + doc.Key;
});

const Image = mongoose.model<ImageDoc, ImageModel>("Image", imageSchema);

export { Image };
