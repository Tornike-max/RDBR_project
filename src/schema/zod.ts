import * as z from "zod";

// Define the schema
const realEstateSchema = z.object({
  address: z.string().min(2, "Address must be at least 2 characters long"),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 1_000_000, {
      message: "Image size must not exceed 1MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          file.type
        ),
      {
        message: "Only JPEG, PNG, and GIF formats are allowed",
      }
    ),
  region_id: z.string().min(1, "Region is required"),
  city_id: z.string().min(1, "City is required"),
  zip_code: z.string().regex(/^\d+$/, "Postal Code must be numeric"),
  price: z.string().regex(/^\d+$/, "Price must be numeric"),
  area: z.string().regex(/^\d+$/, "Area must be numeric"),
  bedrooms: z.string().regex(/^\d+$/, "Number of Bedrooms must be numeric"),
  description: z
    .string()
    .min(5, "Description must be at least 5 words")
    .transform((description) => {
      const wordCount = description.trim().split(/\s+/).length;
      if (wordCount < 5) {
        throw new Error("Description must be at least 5 words");
      }
      return description;
    }),
  saleOrRent: z
    .enum(["sale", "rent"])
    .refine((value) => ["sale", "rent"].includes(value), {
      message: "Sale/Rent tag is required",
    }),
  agent_id: z.string().min(1, "Agent is required"),
});

export { realEstateSchema };
