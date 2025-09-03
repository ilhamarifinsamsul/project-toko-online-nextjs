import React from "react";
import FormProduct from "../_components/form-product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getBrands } from "../../brands/lib/data";
import { getCategories } from "../../categories/lib/data";
import { getLocations } from "../../locations/lib/data";

export default async function CreatePage() {
  const brands = await getBrands();
  const categories = await getCategories();
  const locations = await getLocations();

  return (
    <FormProduct>
      <div className="grid gap-3">
        <Label htmlFor="brand">Brand</Label>
        <Select name="brand_id" defaultValue="default">
          <SelectTrigger id="brand" aria-label="Select a brand">
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default" disabled>
              Select a brand
            </SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={`${brand.id}`}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="category">Category</Label>
        <Select name="category_id" defaultValue="default">
          <SelectTrigger id="category" aria-label="Select a category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default" disabled>
              Select a category
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={`${category.id}`}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="location">Location</Label>
        <Select name="location_id" defaultValue="default">
          <SelectTrigger id="location" aria-label="Select a location">
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default" disabled>
              Select a location
            </SelectItem>
            {locations.map((location) => (
              <SelectItem key={location.id} value={`${location.id}`}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FormProduct>
  );
}
