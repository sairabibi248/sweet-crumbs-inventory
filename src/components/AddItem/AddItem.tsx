import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ItemData } from "../../Hooks/useInventory";
import { itemSchema, type ItemFormFields } from "../../schemas/itemSchema";

type AddItemProps = {
  onClose: () => void;
  onSave: (newData: ItemData) => void;
};

const categories: string[] = [
  "Cakes",
  "Donuts",
  "Macarons",
  "Cupcakes",
  "Cookies",
];

/**
 * Popup form to add a new product.
 * Opens with empty fields. The user must upload an image and fill all fields.
 *
 * @param {object} props
 * @param {function} props.onClose - Closes the popup without adding anything
 * @param {function} props.onSave - Receives the new product data when "Add item" is clicked
 */
const AddItem = ({ onClose, onSave }: AddItemProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ItemFormFields>({
    resolver: zodResolver(itemSchema),
    mode: "onChange",
    defaultValues: {
      image: "",
      title: "",
      category: "Cakes",
    },
  });

  const image = watch("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", URL.createObjectURL(file), { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<ItemFormFields> = (data) => {
    onSave(data);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-50 py-7.5 px-5"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#fffafc] w-100 max-w-[90%] rounded-xl p-6 flex flex-col gap-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-[#4a2c11]">Add new item</h2>

        <div className="flex items-center gap-4">
          {image ? (
            <img
              src={image}
              alt="New product"
              className="h-20 bg-[#f9ecf3] rounded-lg border border-[#fbcfe8]"
            />
          ) : (
            <div className="h-20 w-27.5 flex items-center justify-center text-xs text-[#b87b91] bg-[#f9ecf3] rounded-lg border border-[#fbcfe8]">
              No image
            </div>
          )}
          <label className="bg-white border border-[#fbcfe8] text-[#9d174d] py-2 px-3.5 rounded-md text-[13px] font-bold cursor-pointer hover:bg-[#fce7f3]">
            Upload image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>
        {errors.image && (
          <p className="text-[13px] text-[#b91c1c]">{errors.image.message}</p>
        )}

        <label className="w-full flex flex-col gap-1 text-xs font-bold text-[#7a5c43]">
          Name
          <input
            {...register("title")}
            className="w-full py-2 px-2.5 text-sm font-normal border border-[#fbcfe8] rounded-md bg-white text-[#1f2937] outline-none focus:border-[#db2777]"
            placeholder=" Blueberry Muffin"
          />
        </label>
        {errors.title && (
          <p className="text-[13px] text-[#b91c1c]">{errors.title.message}</p>
        )}

        <label className="w-full flex flex-col gap-1 text-xs font-bold text-[#7a5c43]">
          Category
          <select
            {...register("category")}
            className="w-full py-2 px-2.5 text-sm font-normal border border-[#fbcfe8] rounded-md bg-white text-[#1f2937] outline-none focus:border-[#db2777]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        {errors.category && (
          <p className="text-[13px] text-[#b91c1c]">{errors.category.message}</p>
        )}

        <div className="flex gap-3">
          <label className="w-full flex flex-col gap-1 text-xs font-bold text-[#7a5c43]">
            Price (Rs)
            <input
              {...register("price", { valueAsNumber: true })}
              className="w-full py-2 px-2.5 text-sm font-normal border border-[#fbcfe8] rounded-md bg-white text-[#1f2937] outline-none focus:border-[#db2777]"
              type="number"
              min="1"
              placeholder="0"
            />
          </label>

          <label className="w-full flex flex-col gap-1 text-xs font-bold text-[#7a5c43]">
            Quantity
            <input
              {...register("quantity", { valueAsNumber: true })}
              className="w-full py-2 px-2.5 text-sm font-normal border border-[#fbcfe8] rounded-md bg-white text-[#1f2937] outline-none focus:border-[#db2777]"
              type="number"
              min="0"
              placeholder="0"
            />
          </label>
        </div>
        {errors.price && (
          <p className="text-[13px] text-[#b91c1c]">{errors.price.message}</p>
        )}
        {errors.quantity && (
          <p className="text-[13px] text-[#b91c1c]">{errors.quantity.message}</p>
        )}

        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            className="bg-white text-[#4b5563] border border-[#d1d5db] py-2 px-4.5 rounded-md font-bold text-[13px] cursor-pointer hover:bg-[#f3f4f6]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#b85e83] text-white border border-[#b85e83] py-2 px-4.5 rounded-md font-bold text-[13px] cursor-pointer hover:bg-[#a04a6f]"
          >
            Add item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;