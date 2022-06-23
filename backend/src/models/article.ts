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
  time: Date;
  title: string;
  slug: string;

  version: string;
  blocks: ArticleBlock[];
}

/**
 * Query result object has these values
 */
interface ArticleDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;

  title: string;
  slug: string;

  version: string;
  blocks: ArticleBlock[];
}

interface ArticleModel extends mongoose.Model<ArticleDocument> {
  build(attrs: ArticleAttrs): ArticleDocument;
}

const articleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
    required: true,
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

export { Article, ArticleAttrs };
