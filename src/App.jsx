import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Insert from "./components/insert";
import UploadedImagesPage from "./components/UploadedImagesPage";
import "./index.css";

const App = () => {
  const [images, setImages] = useState([]);

  const checkStorageLimit = () => {
    const storageUsage = JSON.stringify(localStorage).length;
    return storageUsage < 5 * 1024 * 1024;
  };

  useEffect(() => {
    const storedImages = localStorage.getItem("uploadedImages");
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  useEffect(() => {
    if (checkStorageLimit()) {
      localStorage.setItem("uploadedImages", JSON.stringify(images));
    } else {
      console.warn("Storage limit exceeded. Consider cleaning up old data.");
      localStorage.removeItem("uploadedImages");
    }
  }, [images]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Insert setImages={setImages} />} />
        <Route
          path="/uploaded-images"
          element={<UploadedImagesPage images={images} setImages={setImages} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
