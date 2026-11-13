import { z } from "zod";

export const itemSchema = z.object({
  image: z
    .string()
    .min(1, { message: "Upload a product image" }),

  title: z
    .string()
    .trim()
    .min(1, { message: "Enter a product name" }),

  category: z.enum(["Cakes", "Donuts", "Macarons", "Cupcakes", "Cookies"], {
    message: "Select a category",
  }),

  price: z
    .number({ message: "Enter a valid price" })
    .min(1, { message: "Price must be at least 1" }),

  quantity: z
    .number({ message: "Enter a valid quantity" })
    .min(0, { message: "Quantity cannot be negative" }),
});

export type ItemFormFields = z.infer<typeof itemSchema>;