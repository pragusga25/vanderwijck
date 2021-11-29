import { useState } from 'react';
import {
  FieldValues,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { TextField } from './TextField';
import { SelectField } from './SelectField';
import { SelectPlainField } from './SelectPlainField';
import { SelectObject } from './SelectField';

export interface ItemProps {
  itemName: string;
  itemId: string;
  subcode: SelectObject[];
  avl: number;
}

const MaterialRequestForm: React.FC<{ data: ItemProps[] }> = ({ data }) => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const [materials, addMaterials] = useState<any[]>(['']);

  const addMaterialField = () => addMaterials(materials.concat([''])); // ini cm buat nambahin field material doang

  function handleSend() {
    console.log('On Send');
    console.log(getValues('e'));
  }

  return (
    <div className="w-full border-black mt-8">
      <form>
        <div className="flex flex-wrap gap-x-6">
          <TextField
            register={register}
            fieldLabel="Project No:"
            fieldName="e.projectNo"
            className="md:w-52 lg:w-64 text-lg"
          />
          <TextField
            register={register}
            fieldLabel="Requested By:"
            fieldName="e.requestedBy"
            className="md:w-52  lg:w-64 text-lg"
          />
          <TextField
            register={register}
            fieldLabel="Approved By:"
            fieldName="e.approvedBy"
            className="md:w-52  lg:w-64 text-lg"
          />
        </div>
        {materials.map((e, idx) => (
          <Material
            key={`material-${idx}`}
            setValue={setValue}
            data={data}
            register={register}
            no={++idx}
          />
        ))}
        <div className="flex items-center justify-between mt-12">
          <img
            src="/role/add.png"
            alt=""
            onClick={addMaterialField}
            className="w-10 h-10 md:w-16 md:h-16 cursor-pointer transform ease-in-out duration-300 hover:scale-110"
          />
          <div className="flex gap-x-3 md:gap-x-6">
            <div
              onClick={handleSend}
              className="flex justify-center items-center px-6 outline-none cursor-pointer font-medium transform ease-in-out duration-500 hover:bg-blue-venice text-white rounded-2xl py-1 sm:px-6 sm:py-1.5 lg:px-9 lg:py-2 bg-blue-astronaut"
            >
              Send
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default MaterialRequestForm;

const Material: React.FC<{
  register: UseFormRegister<FieldValues>;
  no: number;
  data: ItemProps[];
  setValue: UseFormSetValue<FieldValues>;
}> = ({ register, no, data, setValue }) => {
  const [activeItem, setActiveItem] = useState<ItemProps>(null);

  function onItemChange(itemId: string) {
    setValue(`e.material-${no}.item-name`, itemId);
    onSubcodeChange('')
    setActiveItem(data.find((e) => e.itemId == itemId));
  }
  
  function onSubcodeChange(subcode: string) {
    setValue(`e.material-${no}.subcode`, subcode);
  }
  return (
    <div>
      <h1 className="font-bold mt-8 text-xl md:text-2xl lg:text-4xl">
        Material {no}{' '}
      </h1>
      <div className="grid grid-cols-12 my-2">
        <div className="col-span-12 md:col-span-8">
          <label
            htmlFor={`e.material-${no}.item-name`}
            className=" md:mt-0 mt-3 mb-1 md:mb-4 xl:mb-6 font-medium text-lg block"
          >
            {'Item Name:'}
          </label>
          <SelectPlainField
            onChange={onItemChange}
            className=" w-full text-lg "
            choices={data.map((e) => {
              return {
                value: e.itemId,
                text: e.itemName,
              };
            })}
          />
        </div>
        <div className="hidden md:block md:col-span-1"></div>
        <div className="col-span-3 md:col-span-1 flex">
          <TextField
            register={register}
            fieldLabel="Qty:"
            fieldName={`e.material-${no}.qty`}
            className="w-full text-lg"
            type="number"
          />
        </div>
        <div className="md:col-span-1"></div>
        <div className="col-span-3 md:col-span-1 flex">
          <TextField
            register={register}
            fieldLabel="Avl:"
            fieldName={`e.material-${no}.avl`}
            className="w-full text-lg"
            disabled
            value={ `${activeItem?.avl ?? ''}`}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 my-2">
        <div className="col-span-12 md:col-span-8">
          <TextField
            register={register}
            fieldLabel="Remarks:"
            fieldName={`e.material-${no}.remarks`}
            className="w-full text-lg"
          />
        </div>
        <div className="hidden md:block md:col-span-1"></div>
        <div className="col-span-5 md:col-span-3">
          <label
            htmlFor={`e.material-${no}.subcode`}
            className=" md:mt-0 mt-3 mb-1 md:mb-4 xl:mb-6 font-medium text-lg block"
          >
            {'Subcode:'}
          </label>

          <SelectPlainField
            onChange={onSubcodeChange}
            subcode
            className=" w-full text-lg "
            choices={
              data.find((e) => e.itemId == activeItem?.itemId)?.subcode ?? []
            }
          />
        </div>
      </div>
    </div>
  );
};
