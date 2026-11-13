import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Item, ItemData } from "../../Hooks/useInventory";
import { itemSchema, type ItemFormFields } from "../../schemas/itemSchema";

type EditProps = {
  item: Item;
  onClose: () => void;
  onSave: (newData: ItemData) => void;
};

const categories: string[] = ["Cakes", "Donuts", "Macarons", "Cupcakes", "Cookies"];

const Edit = ({ item, onClose, onSave }: EditProps) => {
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
      image: item.image,
      title: item.title,
      category: item.category as ItemFormFields["category"],
      price: item.price,
      quantity: item.quantity,
    },
  });

  const image = watch("image");
  const title = watch("title");

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
        <h2 className="text-xl font-bold text-[#4a2c11]">Edit product</h2>

        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={title}
            className="h-20 bg-[#f9ecf3] rounded-lg border border-[#fbcfe8]"
          />
          <label className="bg-white border border-[#fbcfe8] text-[#9d174d] py-2 px-3.5 rounded-md text-[13px] font-bold cursor-pointer hover:bg-[#fce7f3]">
            Change image
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
            />
          </label>

          <label className="w-full flex flex-col gap-1 text-xs font-bold text-[#7a5c43]">
            Quantity
            <input
              {...register("quantity", { valueAsNumber: true })}
              className="w-full py-2 px-2.5 text-sm font-normal border border-[#fbcfe8] rounded-md bg-white text-[#1f2937] outline-none focus:border-[#db2777]"
              type="number"
              min="0"
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
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;