import { ProductFormData } from "@/hooks/useProductForm";
import SizePricingSection from "./SizePricingSection";
import {
  BasicInfoFields,
  ImageFields,
  DescriptionFields,
  TagsField
} from "./form-fields";

interface ProductFormFieldsProps {
  formData: ProductFormData;
  setFormData: (data: ProductFormData) => void;
}

export default function ProductFormFields({ formData, setFormData }: ProductFormFieldsProps) {
  return (
    <>
      <BasicInfoFields formData={formData} setFormData={setFormData} />
      <ImageFields formData={formData} setFormData={setFormData} />
      <DescriptionFields formData={formData} setFormData={setFormData} />
      <SizePricingSection formData={formData} setFormData={setFormData} />
      <TagsField formData={formData} setFormData={setFormData} />
    </>
  );
}
