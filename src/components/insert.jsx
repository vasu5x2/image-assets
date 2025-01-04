import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageDrawer from "./ImageDrawer";

const Insert = ({ setImages }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [rotate, setRotate] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
        setOpenDrawer(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = () => {
    if (!imgSrc) return;
    const modifiedImage = { src: imgSrc, rotate, flipH, flipV };
    setImages((prevImages) => [...prevImages, modifiedImage]);
    setOpenDrawer(false);
    navigate("/uploaded-images");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <img
        src="/assets/1.jpg"
        alt="Box"
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-auto mb-4"
      />
      <label className="text-lg font-semibold mb-2">Add assets here</label>
      <Button
        variant="contained"
        color="primary"
        onClick={() => document.getElementById("file-input").click()}
      >
        + ADD
      </Button>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      {imgSrc && (
        <ImageDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          rotate={rotate}
          setRotate={setRotate}
          flipH={flipH}
          setFlipH={setFlipH}
          flipV={flipV}
          setFlipV={setFlipV}
          handleUploadImage={handleUploadImage}
        />
      )}
    </div>
  );
};

export default Insert;
