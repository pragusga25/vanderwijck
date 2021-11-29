import React, { useEffect, useState } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { SelectObject } from './SelectField';

export const SelectPlainField: React.FC<{
  placeHolder?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  choices: SelectObject[];
  onChange: (string) => void;
  subcode?: boolean;
  defaultValue?:string;
}> = ({ className, choices, onChange, subcode, defaultValue='' }) => {
  const [selected, setSelected] = useState(defaultValue);

  useEffect(()=>{
    onChange(defaultValue)
  },[])

  useEffect(() => {
    if (subcode) setSelected('');
  }, [choices]);

  function onSelect(e) {
    setSelected(e.target.value);
    onChange(e.target.value);
  }
  return (
    <div className={className}>
      <select
        onChange={onSelect}
        value={selected ?? ''}
        className=" w-full rounded-2xl appearance-none bg-white p-2 ring-1 ring-black focus:outline-none"
      >
        <option value="">Select...</option>
        {choices.map((obj, idx) => (
          <option
            key={'option-' + idx}
            selected={!!obj.isSelected}
            value={obj.value}
          >
            {obj.text ?? obj.value}
          </option>
        ))}
      </select>
    </div>
  );
};
