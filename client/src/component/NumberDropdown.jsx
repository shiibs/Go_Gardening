export default function NumberDropdown({
  identifier,
  onSelectChange,
  defaultValue,
}) {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const handleChange = (event) => {
    onSelectChange(event);
  };

  return (
    <div>
      <select
        name={identifier}
        id={identifier}
        defaultValue={defaultValue}
        onChange={handleChange}
        className="p-1"
      >
        {numbers.map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>
    </div>
  );
}
