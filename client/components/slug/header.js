import { calculateInner } from "./inlineToolOutput";

const Header = ({ data }) => {
  const { level, text } = data;

  const calculated_inner = calculateInner(text);

  switch (level) {
    case 1:
      return <h1 className="text-4xl p-2">{calculated_inner}</h1>;
    case 2:
      return <h2 className="text-3xl p-2">{calculated_inner}</h2>;
    case 3:
      return <h3 className="text-2xl p-2">{calculated_inner}</h3>;
    case 4:
      return <h4 className="text-xl p-2">{calculated_inner}</h4>;
    case 5:
      return <h5 className="text-lg p-2">{calculated_inner}</h5>;
    case 6:
      return <h6 className="text-base p-2">{calculated_inner}</h6>;
  }
};

export default Header;
