import mongoose from "mongoose";

interface ArticleBlock {
  id: string;
  type: string;
  data: any;
}

/**
 * Creation Requirements
 */
interface ArticleAttrs {
  userId: mongoose.Types.ObjectId;

  title: String;
  slug: String;

  version: string;
  blocks: ArticleBlock[];
}

/**
 * Query result object has these values
 */
interface ArticleDocument extends mongoose.Document {
  build(attrs: ArticleAttrs): ArticleDocument;
}

interface ArticleModel extends mongoose.Model<ArticleDocument> {
  build(attrs: ArticleAttrs): ArticleDocument;
}

const articleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: Date,
    default: new Date(),
  },
  version: {
    type: String,
    required: true,
  },
  blocks: {
    type: [
      {
        id: { type: String, required: true },
        type: { type: String, required: true },
        data: { type: Object, required: true },
      },
    ],
    required: true,
  },
});

articleSchema.statics.build = (attrs: ArticleAttrs) => {
  return new Article(attrs);
};

const Article = mongoose.model<ArticleDocument, ArticleModel>(
  "Article",
  articleSchema
);

export { Article };
