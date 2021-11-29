import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface SelectObject {
  value: string;
  text?: string;
  isSelected?: boolean;
}

export const SelectField: React.FC<{
  register: UseFormRegister<FieldValues>;
  fieldName: string;
  placeHolder?: string;
  fieldLabel: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  choices: SelectObject[];
}> = ({ fieldName, register, fieldLabel, className, choices }) => {
  return (
    <div className={className}>
      <label
        htmlFor={fieldName}
        className=" md:mt-0 mt-3 mb-1 md:mb-4 xl:mb-6 font-medium text-lg block"
      >
        {fieldLabel}
      </label>
      <select
        className="bg-white w-full appearance-none border-black rounded-2xl ring-1 ring-black p-2 focus:outline-none"
        {...register('category')}
      >
        <option value="">Select...</option>
        {choices.map((obj, idx) => (
          <option key={`option-${idx}`} selected={!!obj.isSelected} value={obj.value}>
            {obj.text ?? obj.value}
          </option>
        ))}
      </select>
    </div>
  );
};


export const SelectFieldCategory: React.FC<{
    register: UseFormRegister<FieldValues>;
    placeHolder?: string;
    value?: string;
    disabled?: boolean;
    className?: string;
    choices: SelectObject[];
    fieldName: string
  }> = ({  register, className, choices, fieldName }) => {
    return (
      <div className={className}>
        <select
          className=" w-full rounded-sm bg-gray-100 p-2 ring-1 ring-black focus:outline-none"
          {...register(fieldName)}
        >
          <option value="">Select...</option>
          {choices.map((obj,idx) => (
            <option key={"option-"+idx} selected={!!obj.isSelected} value={obj.value}>
              {obj.text ?? obj.value}
            </option>
          ))}
        </select>
      </div>
    );
  };
