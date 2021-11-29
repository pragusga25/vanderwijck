import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export const TextField: React.FC<{
  register: UseFormRegister<FieldValues>;
  fieldName: string;
  placeHolder?: string;
  fieldLabel: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  type?: string
}> = ({
  fieldName,
  register,
  disabled,
  value,
  fieldLabel,
  placeHolder = '',
  className,
  type="text"
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={fieldName}
        className=" md:mt-0 mt-3 mb-1 md:mb-4 xl:mb-6 font-medium text-lg block"
      >
        {fieldLabel}
      </label>
      {disabled ? (
        <input
          className="block w-full border bg-gray-300 border-black rounded-2xl px-3 py-1 focus:outline-none focus:ring-current focus:ring-2 focus:border-transparent"
          value={value}
          placeholder={placeHolder}
          disabled
          type={type}
        />
      ) : (
        <input
          className="block w-full border border-black rounded-2xl px-3 py-1 focus:outline-none focus:ring-current focus:ring-2 focus:border-transparent"
          {...register(fieldName)}
          value={value}
          placeholder={placeHolder}
          id={fieldName}
          type={type}
          min="0"
          required
        />
      )}
    </div>
  );
};
