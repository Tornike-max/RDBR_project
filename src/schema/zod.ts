import * as z from "zod";

// Define the schema
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

export { realEstateSchema };
