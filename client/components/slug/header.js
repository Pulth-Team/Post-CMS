export default function Header({ text, level, id }) {
  const style = "my-4";
  const ParseLevel = () => {
    switch (level) {
      case 1:
        return <h1 className={`text-5xl ${style}`}>{text}</h1>;
        break;
      case 2:
        return <h2 className={`text-4xl ${style}`}>{text}</h2>;
        break;
      case 3:
        return <h3 className={`text-3xl ${style}`}>{text}</h3>;
        break;
      case 4:
        return <h4 className={`text-2xl ${style}`}>{text}</h4>;
        break;
      case 5:
        return <h5 className={`text-xl ${style}`}>{text}</h5>;
        break;
      case 6:
        return <h6 className={`text-lg ${style}`}>{text}</h6>;
        break;
    }
  };

  return ParseLevel();
}
