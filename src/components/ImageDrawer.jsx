import React, { useState, useCallback } from "react";
import { Drawer, Button, IconButton, Box } from "@mui/material";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import FlipIcon from "@mui/icons-material/Flip";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CropIcon from "@mui/icons-material/Crop";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/getCroppedImg";

const ImageDrawer = ({
  openDrawer,
  setOpenDrawer,
  imgSrc,
  setImgSrc,
  rotate,
  setRotate,
  flipH,
  setFlipH,
  flipV,
  setFlipV,
  handleUploadImage,
}) => {
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const handleRotate = () => setRotate((prev) => prev + 90);
  const handleFlipH = () => setFlipH(!flipH);
  const handleFlipV = () => setFlipV(!flipV);

  const handleCropComplete = useCallback((_, area) => {
    setCroppedArea(area);
  }, []);

  const handleCropSave = async () => {
    const croppedImage = await getCroppedImg(imgSrc, croppedArea, rotate, flipH, flipV);
    setImgSrc(croppedImage);
    setIsCropping(false);
  };

  const handleReplaceImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      sx={{
        "& .MuiDrawer-paper": {
          display: "flex",
          flexDirection: "row",
          width: "90%",
        },
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ flex: 2, padding: 2, position: "relative" }}>
          {isCropping ? (
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          ) : (
            <img
              src={imgSrc}
              alt="Selected"
              style={{
                maxHeight: "80vh",
                transform: `rotate(${rotate}deg) ${flipH ? "scaleX(-1)" : ""} ${
                  flipV ? "scaleY(-1)" : ""
                }`,
              }}
            />
          )}
        </Box>
        <Box sx={{ flex: 1, padding: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          <div>
            <IconButton onClick={() => setOpenDrawer(false)}>
              <CancelIcon />
            </IconButton>
            <h2>Image Actions</h2>
          </div>
          <Button
            variant="outlined"
            startIcon={<RotateRightIcon />}
            onClick={handleRotate}
            fullWidth
          >
            Rotate 90°
          </Button>
          <Button
            variant="outlined"
            startIcon={<FlipIcon />}
            onClick={handleFlipH}
            fullWidth
          >
            Flip Horizontally
          </Button>
          <Button
            variant="outlined"
            startIcon={<SwapVertOutlinedIcon />}
            onClick={handleFlipV}
            fullWidth
          >
            Flip Vertically
          </Button>
          <Button
            variant="outlined"
            startIcon={<CropIcon />}
            onClick={() => setIsCropping(true)}
            fullWidth
          >
            Crop Image
          </Button>
          {isCropping && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCropSave}
              fullWidth
            >
              Save Crop
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => document.getElementById("replace-file-input").click()}
            fullWidth
          >
            Replace Image
          </Button>
          <input
            id="replace-file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleReplaceImage}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadImage}
            fullWidth
          >
            Upload Image
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ImageDrawer;
