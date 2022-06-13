import Link from "next/link";

//only work with <a> tag at the moment

// export const calculateInner = (text) => {
//   const tag_selector =
//     /<([^>]*.*)(\s*)?>(.*?)<\s*\/\s*\1>|<([^>]*.*)(\s*)([A-Za-z][A-Za-z]*=".*[^]")>(.*?)<\s*\/\s*\4>/gi;
//   const match = text.match(tag_selector);
// };

export const calculateInner = (text) => {
  const tagSelector = /<\s*a[^>]*>(.*?)<\s*\/\s*a>/gi;
  const escapeSelector = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi;

  // deleting all html escapes
  text = text.replace(escapeSelector, "");

  //default calculated_inner equals to html-Escaped text
  let returnVal = text;

  const match = text.match(tagSelector);

  if (match) {
    returnVal = match.map((tag) => {
      const inner_text = tag.replace(/(<a href=".*.">|<\/a>)/g, "");
      const href = tag.match(/\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/)[2];

      const index = text.search(tag);
      text = text.replace(tag, "");
      const before_text = text.slice(0, index);
      text = text.slice(index, text.length);

      return (
        <>
          {before_text}
          <Link href={href}>
            <div className="underline inline-block cursor-pointer px-1">
              {inner_text}
            </div>
          </Link>
        </>
      );
    });
  }

  return returnVal;
};
