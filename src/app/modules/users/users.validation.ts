import { z } from "zod";

const userValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string"
    }).min(1, { message: "Name cannot be empty" }),
    
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string"
    }).email({ message: "Invalid email address" }),
    
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string"
    }).min(6, { message: "Password must be at least 6 characters long" }),
    
    phone: z.number({
      required_error: "Phone is required",
      invalid_type_error: "Phone must be a number"
    }).int({ message: "Phone must be an integer" }),
    
    address: z.string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string"
    }),
    
    role: z.enum(["admin", "user"], {
      required_error: "Role is required",
      invalid_type_error: "Role must be either 'admin' or 'user'"
    }),
    
    isDeleted: z.boolean({
      required_error: "isDeleted is required",
      invalid_type_error: "isDeleted must be a boolean"
    })
  })
});

export default userValidation;
