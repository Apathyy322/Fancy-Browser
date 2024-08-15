// src/components/uploader.tsx

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface ImageUploaderProps {
  onSavePreset: (name: string, imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onSavePreset }) => {
  const [presetName, setPresetName] = useState<string>('');
  const [presetImage, setPresetImage] = useState<string>('');

  const handleSave = () => {
    onSavePreset(presetName, presetImage);
    setPresetName('');
    setPresetImage('');
  };

  return (
    <Form className="preset-form">
      <Form.Group controlId="presetName">
        <Form.Label>Preset Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter preset name"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="presetImage">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          value={presetImage}
          onChange={(e) => setPresetImage(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSave}>
        Save Preset
      </Button>
    </Form>
  );
};

export default ImageUploader;
