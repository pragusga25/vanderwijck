import { SelectFieldCategory } from '@components/general/form/SelectField';
import { TextField } from '@components/general/form/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface ProjectCategoryData {
  categoryId?: string;
  categoryName: string;
}
const CategorySearchBar: React.FC<{ data: ProjectCategoryData[], onSearch: any }> = ({ data, onSearch }) => {
  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSearch)}>
    <div className="flex">
        <SelectFieldCategory
          register={register}
          fieldName="categoryId"
          className="md:w-40 lg:w-52"
          choices={data.map((e) => {
            return {
              text: e.categoryName,
              value: e.categoryId,
            };
          })}
        />
        <input
          className="block w-72 border px-3 py-1 ring-1 ring-black focus:outline-none focus:ring-current focus:ring-2 focus:border-transparent"
          {...register('itemName')}
          id={'itemName'}
        />
        <button type="submit"  className="bg-gray-100 w-16 flex border-black border  justify-center" >
            <img src="/role/search.png" alt="" height="80%" />
        </button>
      </div>
    </form>
  );
};
export default CategorySearchBar;