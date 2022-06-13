import Header from "./header";
import Paragraph from "./paragraph";

const OutputRenderer = ({ blocks }) => {
  console.log(blocks);

  return (
    <div>
      {blocks.map((block) => {
        switch (block.type) {
          case "header":
            return <Header key={block.id} data={block.data} />;
          case "paragraph":
            return <Paragraph key={block.id} data={block.data} />;
        }
      })}
    </div>
  );
};

export default OutputRenderer;
