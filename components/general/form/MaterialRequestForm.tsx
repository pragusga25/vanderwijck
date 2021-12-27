import { useState } from 'react';
import {
  FieldValues,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { TextField } from './TextField';
import { SelectPlainField } from './SelectPlainField';
import { Remark, Status } from '@prisma/client';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/router';

export interface ItemProps {
  itemName: string;
  itemId: string;
  // subcode: SelectObject[];
  avl: number;
}

const MaterialRequestForm: React.FC<{ data: ItemProps[]; remarks: Remark[] }> =
  ({ data, remarks }) => {
    const router = useRouter();
    const { register, getValues, setValue } = useForm();
    const [materials, addMaterials] = useState<any[]>(['']);
    const [loading, setLoading] = useState(false);

    const addMaterialField = () => addMaterials(materials.concat([''])); // ini cm buat nambahin field material doang

    function handleSend(e) {
      e.preventDefault();
      const vals = getValues('e');
      const dataPost = [];

      if (!vals.requestedBy || !vals.approvedBy) {
        return toast.error('Silkan lengkapi form terlebih dahulu');
      }

      for (const val in vals) {
        if (val.startsWith('material-')) {
          const itemId = vals[val]['item-name'];
          const quantity = vals[val]['qty'];
          const remarkId = vals[val]['remark'];

          if (!itemId) {
            continue;
          }

          if (!itemId || !quantity || !remarkId) {
            return toast.error('Silkan lengkapi form terlebih dahulu');
          }

          const itemName =
            data
              .find((d) => d.itemId === itemId)
              ?.itemName?.toLocaleLowerCase() ?? '';

          const unit = itemName?.startsWith('pipe') ? 'm' : 'pcs';

          dataPost.push({
            quantity: Number(quantity as string),
            unit,
            status: Status.MATERIAL_REQUEST_SENT,
            itemId: Number(itemId as string),
            remarkId: Number(remarkId),
          });
        }
      }
      if (dataPost.length == 0) {
        return toast.error('Belum ada item yang dimasukan');
      }
      const URL = '/api/project/materialRequest';

      setLoading(true);
      toast
        .promise(
          axios.post(URL, {
            dataPost,
            requestedBy: vals.requestedBy as string,
            approvedBy: vals.approvedBy as string,
          }),
          {
            success: 'Data berhasil dibuat',
            error: 'Data gagal dibuat',
            loading: 'Membuat data...',
          }
        )
        .then(() => router.replace(router.asPath))
        .finally(() => setLoading(false));
    }

    return (
      <div className="w-full border-black mt-8">
        <form>
          <div className="flex flex-wrap gap-x-6">
            <TextField
              register={register}
              value="1367"
              disabled={true}
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
              remarks={remarks}
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
              <button
                onClick={handleSend}
                disabled={loading}
                className="flex justify-center items-center px-6 outline-none cursor-pointer font-medium transform ease-in-out duration-500 hover:bg-blue-venice text-white rounded-2xl py-1 sm:px-6 sm:py-1.5 lg:px-9 lg:py-2 bg-blue-astronaut"
              >
                Send
              </button>
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
  remarks: Remark[];
}> = ({ register, no, data, setValue, remarks }) => {
  const [activeItem, setActiveItem] = useState<ItemProps>(null);

  function onItemChange(itemId: string) {
    setValue(`e.material-${no}.item-name`, itemId);
    onSubcodeChange('');
    setActiveItem(data.find((e) => e.itemId == itemId));
  }

  function onRemarkChange(remarkId: string) {
    setValue(`e.material-${no}.remark`, remarkId);
    onSubcodeChange('');
    // setActiveItem(data.find((e) => e.remarkId == remarkId));
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
            value={`${activeItem?.avl ?? ''}`}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 my-2">
        <div className="col-span-12 md:col-span-8">
          <label
            htmlFor={`e.material-${no}.remarks`}
            className=" mb-2 mt-4 font-medium text-lg block"
          >
            {'Remarks:'}
          </label>
          <SelectPlainField
            onChange={onRemarkChange}
            placeHolder="Remarks"
            className=" w-full text-lg "
            choices={remarks.map((e) => {
              return {
                value: e.id + '',
                text: e.name,
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};
