import { z } from "zod";

const bikeValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(1, { message: "Name cannot be empty" }),

    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),

    pricePerHour: z.number({
      required_error: "Price per hour is required",
      invalid_type_error: "Price per hour must be a number",
    }).positive({ message: "Price per hour must be a positive number" }),
    isAvailable : z.boolean({required_error: "Bike availablity status is required",
      invalid_type_error: "Bike availablity status should be true or false"}),
    cc: z.number({
      required_error: "CC is required",
      invalid_type_error: "CC must be a number",
    }).int({ message: "CC must be an integer" }),

    year: z.number({
      required_error: "Year is required",
      invalid_type_error: "Year must be a number",
    }).int({ message: "Year must be an integer" }),

    model: z.string({
      required_error: "Model is required",
      invalid_type_error: "Model must be a string",
    }),

    brand: z.string({
      required_error: "Brand is required",
      invalid_type_error: "Brand must be a string",
    }),
  })
});

export default bikeValidation;