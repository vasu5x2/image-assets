import React, { useState , useEffect} from "react";
import { Button, Alert } from "@mui/material";
import UploadImageMasonry from "./UploadImageMasonry";
import ImageDrawer from "./ImageDrawer"; // Import ImageDrawer



const UploadedImagesPage = ({ images, setImages }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [rotate, setRotate] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [deletedImage, setDeletedImage] = useState(null);

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
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false); // Hide alert after 5 seconds
      }, 5000); // 5000 ms = 5 seconds

      return () => clearTimeout(timer); // Cleanup timeout on component unmount or alert change
    }
  }, [showAlert]); 
  const handleUploadImage = () => {
    const newImage = { src: imgSrc, rotate, flipH, flipV };
    setImages((prevImages) => {
      const updatedImages = [...prevImages, newImage];
      localStorage.setItem("uploadedImages", JSON.stringify(updatedImages)); // Update localStorage
      return updatedImages;
    });
    setOpenDrawer(false); // Close drawer after uploading
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
    setDeletedImage(index);
    setShowAlert(true);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex w-full justify-start items-center mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search images..." 
          className="border rounded-md px-4 py-2 w-1/2"
        />
        <select className="border rounded-md px-4 py-2 ">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="az">A-Z</option>
        </select>

        {/* Add Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => document.getElementById("file-input").click()} // Opens file input
          style={{ marginLeft: "10px" }}
        >
          + Add
        </Button>
      </div>

      {/* File Input */}
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* ImageDrawer for Image Manipulation */}
      {imgSrc && (
        <ImageDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          imgSrc={imgSrc}
          rotate={rotate}
          setRotate={setRotate}
          flipH={flipH}
          setFlipH={setFlipH}
          flipV={flipV}
          setFlipV={setFlipV}
          handleUploadImage={handleUploadImage}
          setImgSrc={setImgSrc}
        />
      )}

      {/* Display the images using masonry layout */}
      <UploadImageMasonry
        images={images}
        handleDeleteImage={handleDeleteImage} // Pass delete function to UploadImageMasonry
      />

      {/* Show Alert when an image is deleted */}
      {showAlert && (
        <Alert
          severity="warning"
          onClose={() => setShowAlert(false)}
          sx={{ marginTop: 2 }}
        >
          Image {deletedImage + 1} deleted successfully!
        </Alert>
      )}
    </div>
  );
};

export default UploadedImagesPage;
