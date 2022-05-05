import mongoose, { ObjectId } from "mongoose";

interface ArticleBlock {
  id: string;
  type: string;
  data: any;
}

interface ArticleAttrs {
  userId: ObjectId;
  time: number;
  version: string;
  blocks: ArticleBlock[];
}

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
  time: {
    type: Number,
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

const Article = mongoose.model<ArticleDocument, ArticleModel>(
  "Article",
  articleSchema
);

export { Article };
