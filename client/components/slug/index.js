import Header from "./header";
import Paragraph from "./paragraph";
import Delimiter from "./delimiter";
import List from "./list";

const OutputRenderer = ({ blocks }) => {
  return (
    <div>
      {blocks.map((block) => {
        switch (block.type) {
          case "header":
            return <Header key={block.id} data={block.data} />;
          case "paragraph":
            return <Paragraph key={block.id} data={block.data} />;
          case "delimiter":
            return <Delimiter key={block.id}></Delimiter>;
          case "list":
            return <List key={block.id} data={block.data}></List>;
          default:
            console.log(
              "Unsupported Block Type given (type:  '",
              block.type,
              "')"
            );
            break;
        }
      })}
    </div>
  );
};

export default OutputRenderer;
