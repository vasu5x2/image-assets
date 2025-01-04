import React, { useState } from "react";
import { IconButton, Menu, MenuItem, ImageList, ImageListItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Blank heart icon
import FavoriteIcon from "@mui/icons-material/Favorite"; // Filled heart icon

const UploadImageMasonry = ({ images, handleDeleteImage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [likedImages, setLikedImages] = useState({}); // Track liked images by index

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedImageIndex(null);
  };

  const handleDelete = () => {
    handleDeleteImage(selectedImageIndex);
    handleClose();
  };

  const handleLike = (index) => {
    setLikedImages((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle like status
    }));
  };

  return (
    <div style={{ marginTop: "20px", width: "100%" }}>
      <ImageList variant="masonry" cols={3} gap={8} sx={{ width: "100%" }}>
        {images.map((image, index) => (
          <ImageListItem key={index}>
            <div className="imageContainer">
              <img
                src={image.src}
                alt={`Uploaded ${index}`}
                style={{
                  transform: `rotate(${image.rotate}deg) ${image.flipH ? "scaleX(-1)" : ""} ${
                    image.flipV ? "scaleY(-1)" : ""
                  }`,
                }}
              />
              {/* Heart Icon (Like button) above the image (top-right) */}
              <IconButton
                className="heartIcon"
                onClick={() => handleLike(index)}
              >
                {likedImages[index] ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>

              {/* Three Dots Icon visible on hover (bottom-right) */}
              <IconButton
                onClick={(event) => handleClick(event, index)}
                className="dotsIcon"
              >
                <MoreVertIcon />
              </IconButton>

              {/* Menu for image options (Hide, Edit, Delete) */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && selectedImageIndex === index}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDelete} className="menuItem">
                  <DeleteIcon className="menuItemIcon" />
                  Delete
                </MenuItem>
                {/* Hide and Edit options are non-functional */}
                <MenuItem onClick={handleClose} className="menuItem">
                  Hide
                </MenuItem>
                <MenuItem onClick={handleClose} className="menuItem">
                  Edit
                </MenuItem>
              </Menu>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default UploadImageMasonry;
