import * as z from "zod";

const realEstateSchema = z.object({
  address: z.string().min(2, "Address must be at least 2 characters long"),
  image: z.instanceof(File).refine((file) => file.size <= 1_000_000, {
    message: "Image size must not exceed 1MB",
  }),
  region_id: z.string().min(1, "Region is required"),
  city_id: z.string().min(1, "City is required"),
  zip_code: z.string().regex(/^\d+$/, "Postal Code must be numeric"),
  price: z.string().regex(/^\d+$/, "Price must be numeric"),
  area: z.string().regex(/^\d+$/, "Area must be numeric"),
  bedrooms: z.string().regex(/^\d+$/, "Number of Bedrooms must be numeric"),
  description: z.string().min(5, "Description must be at least 5 words"),
  agent_id: z.string().min(1, "Agent is required"),
});

const agentSchema = z.object({
  name: z
    .string()
    .min(2, { message: "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს" })
    .min(0, { message: "სახელი სავალდებულოა" }),

  surname: z
    .string()
    .min(2, { message: "გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს" })
    .min(0, { message: "გვარი სავალდებულოა" }),

  email: z
    .string()
    .email({ message: "ელ-ფოსტა არასწორი ფორმატისაა" })
    .endsWith("@redberry.ge", {
      message: "ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge-თ",
    })
    .min(0, { message: "ელ-ფოსტა სავალდებულოა" }),

  avatar: z.instanceof(File),
  phone: z
    .string()
    .regex(/^5\d{8}$/, {
      message: "ტელეფონის ნომერი უნდა იყოს ამ ფორმატის 5XXXXXXXX",
    })
    .min(0, { message: "ტელეფონის ნომერი სავალდებულოა" }),
});

export { realEstateSchema, agentSchema };
