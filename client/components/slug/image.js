export default function Image({ data }) {
  const { file, withBorder, withBackground, stretched, caption } = data;
  return (
    <div>
      <img src={file.url} alt={caption}></img>
    </div>
  );
}
