import Link from "next/link";
import { Fragment } from "react";

//only work with <a> tag at the moment

let matchTagName = (markup) => {
  const pattern = /<([^\s>]+)(\s|>)+/;
  return markup.match(pattern)[1];
};

export const calculateInner = (text) => {
  text = text.replace(/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, "");

  const parentElementCount = text.match(/<([^\s>]+)([^>]*)>.*?<\/\1>/g);
  const parents = text.match(/<([^\s>]+)([^>]*)>.*?<\/\1>/g);

  let last_index = 0;
  return parents
    ? parents.map((parent, index) => {
        const index = text.indexOf(parent);
        const temp_index = last_index;
        last_index = index + parent.length;
        return (
          <Fragment key={index}>
            {text.slice(temp_index, index)}
            {getElement(parent)}
          </Fragment>
        );
      })
    : text;

  // return mapData;
};

const getElement = (element) => {
  const elementType = matchTagName(element);

  const inner_Data = element.replace(
    /^<([^\s>]+)([^>]*)>|<\/([^\s>]+)([^>]*)>$/g,
    ""
  );
  if (
    !inner_Data.match(/<([^\s>]+)([^>]*)>.*?<\/\1>/g) ||
    inner_Data.match(/<([^\s>]+)([^>]*)>.*?<\/\1>/g).length == 0
  ) {
    switch (elementType) {
      case "a":
        return (
          <Link href="todo">
            <a className="underline inline-block cursor-pointer px-1 ">
              {inner_Data}
            </a>
          </Link>
        );
      case "b":
        return <b className="font-bold">{inner_Data}</b>;
      case "i":
        return <i className="italic">{inner_Data}</i>;
      case "code":
        return (
          <code className="bg-red-100 p-1 rounded m-1 text-red-700">
            {inner_Data}
          </code>
        );

      case "script":
        return;
      default:
        return text;
    }
  } else {
    let last_index = 0;
    return inner_Data
      .match(/<([^\s>]+)([^>]*)>.*?<\/\1>/g)
      .map((parent, index) => {
        const index = inner_Data.indexOf(parent);
        const temp_index = last_index;
        last_index = index + parent.length;
        return (
          <Fragment key={index}>
            {inner_Data.slice(temp_index, index)} {getElement(parent)}
          </Fragment>
        );
      });
  }
};
