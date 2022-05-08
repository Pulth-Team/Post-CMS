export default function List({ items }) {
  return (
    <ul className="list-disc pl-10">
      {items.map((item) => (
        <li key={item} className="mb-2">
          {item}
        </li>
      ))}
    </ul>
  );
}
