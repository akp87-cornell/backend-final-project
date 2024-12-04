import { useState, ChangeEvent } from "react";

interface DropDownProps {
  elements: string[];
  onChange?: (selectedValue: string) => void;
}

export default function DropDown({ elements, onChange }: DropDownProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className='card'>
      <select value={selectedValue} onChange={handleSelectChange}>
        {elements.map((item) => (
          <option>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
