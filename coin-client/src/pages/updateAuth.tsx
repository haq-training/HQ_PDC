import React, { useState } from 'react';
import Button from '@/components/ui/button';

interface ImageFormProps {
  onSubmit: (image: File) => void;
}

const ImageForm: React.FC<ImageFormProps> = ({ onSubmit }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = () => {
    if (selectedImage) {
      onSubmit(selectedImage);
    }
  };

  return (
    <form>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <Button type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default ImageForm;
