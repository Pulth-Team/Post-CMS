import { calculateInner } from "./inlineToolOutput";

const Paragraph = ({ data }) => {
  const { text } = data;

  const calculated_inner = calculateInner(text);

  return <p className=" p-2">{calculated_inner}</p>;
};

export default Paragraph;
