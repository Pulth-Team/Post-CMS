import Link from "next/link";
import { Fragment } from "react";

//only work with <a> tag at the moment

let matchTagName = (markup) => {
  const pattern = /<([^\s>]+)(\s|>)+/;
  return markup.match(pattern)[1];
};

export const calculateInner = (text) => {
  text = text.replace(/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, "");

  const parentElementCount = (text.match(/<([^\s>]+)([^>]*)>.*?<\/\1>/g) || [])
    .length;
  const parents = text.match(/<([^\s>]+)([^>]*)>.*?<\/\1>/g);

  if (parentElementCount == 0) return text;

  let last_index = 0;
  return parents.map((parent, elementIndex) => {
    const index = text.indexOf(parent);
    const temp_index = last_index;
    last_index = index + parent.length;
    const innerElement = calculateElement(parent);

    console.log(elementIndex, parents.length - 1);
    return (
      <Fragment key={index}>
        {text.slice(temp_index, index)} {innerElement}{" "}
        {elementIndex == parents.length - 1
          ? text.slice(last_index, text.length)
          : ""}
      </Fragment>
    );
  });
};

const calculateElement = (element) => {
  const type = matchTagName(element);
  const innerData = element.replace(
    /^\s*?<\2([^>]*)>|<\/([^\s>]+)([^>]*)>\s*?$/g,
    ""
  );
  const isContainsTag =
    (innerData.match(/<([^\s>]+)([^>]*)>.*?<\/\1>/g) || []).length != 0;
  if (element == `<i><b>dolor </b></i>in,`) console.log(isContainsTag);
  if (!isContainsTag) {
    switch (type) {
      case "a":
        const href =
          element.match(/<a\s+(?:[^>]*?\s+)?href=(["' ])(.*?)\1/)[2] || "";
        return (
          <Link href={href}>
            <a className="underline">{innerData}</a>
          </Link>
        );
      case "code":
        return (
          <code className="bg-red-100 text-red-700 p-0.5 rounded ">
            {" "}
            {innerData}
          </code>
        );
      case "i":
        return <i className="italic">{innerData}</i>;
      case "b":
        return <b className="font-bold">{innerData}</b>;
      default:
        console.log("unsupported inline type (type:'", type, "')");
        return;
    }
  } else {
    console.log(element);

    const parents = innerData.match(/<([^\s>]+)([^>]*)>.*?<\/\1>/g);

    let last_index = 0;
    // parent = <i>ut pellentesque est sapien et risus. </i>
    // elementIndex = 0
    let innerParent = parents.map((parent, elementIndex) => {
      const index = innerData.indexOf(parent);
      console.log(index, element);
      const temp_index = last_index;
      last_index = index + parent.length;
      const innerElement = calculateElement(parent);

      console.log(elementIndex, parents.length - 1);
      return (
        <Fragment key={index}>
          {innerData.slice(temp_index, index)} {innerElement}{" "}
          {elementIndex == parents.length - 1
            ? innerData.slice(last_index, innerData.length)
            : ""}
        </Fragment>
      );
    });
    switch (type) {
      case "a":
        const href =
          element.match(/<a\s+(?:[^>]*?\s+)?href=(["' ])(.*?)\1/)[2] || "";
        return (
          <Link href={href}>
            <a className="underline">{innerParent}</a>
          </Link>
        );
      case "code":
        return (
          <code className="bg-red-100 text-red-700 p-0.5 rounded ">
            {" "}
            {innerParent}
          </code>
        );
      case "i":
        return <i className="italic">{innerParent}</i>;
      case "b":
        return <b className="font-bold">{innerParent}</b>;
      default:
        console.log("unsupported inline type (type:'", type, "')");
        return;
    }
  }
};
