import { LogisticsSelectPlainField } from '@components/general/form/LogisticsSelectPlainField';
import { SelectFieldCategory } from '@components/general/form/SelectField';
import { TextField } from '@components/general/form/TextField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SupplierData } from './table/PurchasingTypes';

const SupplierSearchBar: React.FC<{
  data: SupplierData[];
  onSearch: any;
  placeholder?: string;
}> = ({ data, onSearch, placeholder }) => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [choices, setChoices] = useState<string[]>([]);

  function handleSearch() {
    onSearch(getValues('e'));
  }
  function onCategorySelected(fieldName: string, val: string) {
    setSelectedCategory(val);
    setChoices(data.find((e) => e.supplierName == val)?.itemNames ?? []);
    setValue(fieldName, val);
    setValue("e.itemName", '')
  }
  function onItemSelected(fieldName: string, val: string) {
    setValue(fieldName, val);
  }
  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <div className="flex">
        <LogisticsSelectPlainField
          choices={data.map((e) => {
            return {
              text: e.supplierName,
              value: e.supplierName,
            };
          })}
          withSelect
          fieldName="e.categoryId"
          selectClassName="bg-gray-100 ring-1 ring-black focus:outline-none"
          onChange={onCategorySelected}
          placeholder={placeholder}
        />
        {/* <LogisticsSelectPlainField /> */}
        <LogisticsSelectPlainField
          choices={choices.map((e) => {
            return {
              text: e,
              value: e,
            };
          })}
          withSelect
          className="w-72"
          fieldName="e.itemName"
          selectClassName="bg-white ring-1 ring-black focus:outline-none"
          onChange={onItemSelected}
        />
        <button
          type="submit"
          className="bg-gray-100 w-16 flex border-black border  justify-center"
        >
          <img src="/role/search.png" alt="" height="80%" />
        </button>
      </div>
    </form>
  );
};
export default SupplierSearchBar;
