import { useState } from 'react';
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import { TextField } from './TextField';
import { SelectField } from './SelectField';

export default function Form() {
  const { register, handleSubmit, getValues } = useForm();
  const [result, setResult] = useState('');
  const [item, setItem] = useState<any[][]>([[]]);

  function handleBook(){
    console.log("On Book")
    console.log(getValues('e'))
  }

  function handleSend(){
    console.log("On Send")
    console.log(getValues('e'))
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
        {/* <Material register={register} no={1} /> */}
        {item.map((e, idx) => (
          <Material register={register} no={++idx} />
        ))}
        <div className="flex items-center justify-between mt-12">
          <img
            src="/role/add.png"
            alt=""
            onClick={() => setItem(item.concat([[]]))}
            className="w-10 h-10 md:w-16 md:h-16 cursor-pointer transform ease-in-out duration-300 hover:scale-110"
          />
          <div className="flex gap-x-3 md:gap-x-6">
            <div onClick={handleBook} className="flex justify-center items-center px-6 outline-none cursor-pointer font-medium transform ease-in-out duration-500 hover:bg-gray-400 text-white rounded-2xl py-1 sm:px-6 sm:py-1.5 lg:px-9 lg:py-2 bg-gray-500">Book</div>
            <div
            onClick={handleSend}
              className="flex justify-center items-center px-6 outline-none cursor-pointer font-medium transform ease-in-out duration-500 hover:bg-blue-venice text-white rounded-2xl py-1 sm:px-6 sm:py-1.5 lg:px-9 lg:py-2 bg-blue-astronaut"
            >Send</div>
          </div>
        </div>
        <p>{result}</p>
      </form>
    </div>
  );
}
const Material: React.FC<{
  register: UseFormRegister<FieldValues>;
  no: number;
}> = ({ register, no }) => {
  return (
    <div>
      <h1 className="font-bold mt-8 text-xl md:text-2xl lg:text-4xl">
        Material {no}  </h1>
      <div className="grid grid-cols-12 my-2">
        <div className="col-span-12 md:col-span-8">
          <TextField
            register={register}
            fieldLabel="Item name:"
            fieldName={`e.material-${no}.item-name`}
            className=" w-full text-lg"
          />
        </div>
        <div className="hidden md:block md:col-span-1"></div>
        <div className="col-span-3 md:col-span-1 flex">
          <TextField
            register={register}
            fieldLabel="Qty:"
            fieldName={`e.material-${no}.qty`}
            className="w-full text-lg"
          />
        </div>
        <div className="md:col-span-1"></div>
        <div className="col-span-3 md:col-span-1 flex">
          <TextField
            register={register}
            fieldLabel="Avl:"
            fieldName={`e.material-${no}.avl`}
            className="w-full text-lg"
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
        <div className="col-span-5 md:col-span-3 flex">
          <TextField
            register={register}
            fieldLabel="Subcode:"
            fieldName={`e.material-${no}.subcode`}
            className="w-full text-lg"
          />
        </div>
      </div>
    </div>
  );
};

// <SelectField
// fieldLabel="a"
// fieldName="AAA"
// register={register}
// className="md:w-52  lg:w-64"
// choices={[
//     {
//         value:"A"
//     },{
//         value:"B",
//         text:"Ini B"
//     },{
//         value:"kk",
//         isSelected: true
//     }
// ]}
// />
