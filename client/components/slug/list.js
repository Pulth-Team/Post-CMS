import { calculateInner } from "./inlineToolOutput";

const Header = ({ data }) => {
  const { level, text } = data;

  if (data.style === "unordered")
    return (
      <ul className="px-12 py-1.5 list-disc">
        {data.items.map((item, index) => {
          return (
            <li key={index} className="py-1.5 pl-1 leading-6">
              {calculateInner(item)}
            </li>
          );
        })}
      </ul>
    );
  else
    return (
      <ol className="px-12 py-1.5 list-decimal">
        {data.items.map((item, index) => {
          return (
            <li key={index} className="py-1.5 pl-1 leading-6">
              {calculateInner(item)}
            </li>
          );
        })}
      </ol>
    );
};

export default Header;
// padding: 5.5px 0 5.5px 3px;
//     line-height: 1.6em;
