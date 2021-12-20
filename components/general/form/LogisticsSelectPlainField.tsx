import React, { useEffect, useState } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { SelectObject } from './SelectField';

export const LogisticsNumberField: React.FC<{
  disabled?: boolean;
  className?: string;
  fieldName: string;
  onChange: (fieldName: string, val: string) => void;
  defaultValue?: string;
  isText?: boolean;
}> = ({ fieldName, onChange, className, defaultValue, isText = false }) => {
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    onChange(fieldName, defaultValue);
  }, []);

  function onSelect(e) {
    setSelected(e.target.value);
    onChange(fieldName, e.target.value);
  }
  return (
    <input
      onChange={onSelect}
      value={selected ?? ''}
      className="w-full outline-none"
      type={isText ? 'text' : 'number'}
      min="0"
    />
  );
};
export const LogisticsDateField: React.FC<{
  disabled?: boolean;
  className?: string;
  fieldName: string;
  onChange: (fieldName: string, val: string) => void;
  defaultValue?: string;
}> = ({ fieldName, onChange, className, defaultValue }) => {
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    onChange(fieldName, defaultValue);
  }, []);

  function onSelect(e) {
    setSelected(e.target.value);
    onChange(fieldName, e.target.value);
  }
  return (
    <input
      onChange={onSelect}
      value={selected ?? ''}
      className="w-full outline-none"
      type={'date'}
    />
  );
};
export const LogisticsSelectPlainField: React.FC<{
  disabled?: boolean;
  className?: string;
  choices: SelectObject[];
  fieldName: string;
  onChange: (fieldName: string, val: string) => void;
  selectClassName?: string;
  defaultValue?: string;
  withSelect?: boolean;
  resetIfChoicesChanged?: boolean;
  placeholder?: string;
}> = ({
  className,
  choices,
  onChange,
  fieldName,
  defaultValue = '',
  withSelect,
  selectClassName = 'rounded-2xl bg-white',
  resetIfChoicesChanged,
  placeholder,
}) => {
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    onChange(fieldName, defaultValue);
  }, []);

  useEffect(() => {
    if (resetIfChoicesChanged) setSelected(defaultValue);
  }, [choices]);

  function onSelect(e) {
    setSelected(e.target.value);
    onChange(fieldName, e.target.value);
  }
  return (
    <div className={className}>
      <select
        onChange={onSelect}
        value={selected ?? ''}
        className={`w-full   p-2 border-r-4 border-white focus:outline-none ${selectClassName}`}
      >
        {!!withSelect && <option value="">{placeholder ?? 'Select...'}</option>}
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
