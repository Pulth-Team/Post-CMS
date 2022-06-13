import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Code from "@editorjs/code";
// import Image from '@editorjs/image'
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import SimpleImage from "@editorjs/simple-image";

export const tools = {
  header: {
    class: Header,
    inlineToolbar: ["link"],
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  embed: Embed,
  table: Table,
  code: Code,
  // image: Image,
  quote: Quote,
  delimiter: Delimiter,
  simpleImage: SimpleImage,
};
