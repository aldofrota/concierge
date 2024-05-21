import "./index.scss";
import { Image } from "antd";
import { useEffect, useRef, useState } from "react";

const UploadImage = ({ img, width, height, update, folder }: any) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [image, setImage] = useState<any>("/logo-concierge.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    console.log("Folder", folder);

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (img) setImage(img);
  }, [img]);

  return (
    <div className="upload-image-container">
      <img
        src={image}
        alt="Uploaded"
        style={{ width, height, objectFit: "cover", borderRadius: "50%" }}
      />
      <div className={update ? "image-overlay" : "not-visibily"}>
        <span className="view-button">
          <span
            className="material-symbols-rounded icon"
            onClick={() => setPreviewOpen(true)}
          >
            visibility
          </span>
        </span>
        <span className="view-button">
          <span className="material-symbols-rounded icon" onClick={handleImage}>
            edit
          </span>
        </span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      <Image
        wrapperStyle={{ display: "none" }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
        }}
        src={image}
      />
    </div>
  );
};
export default UploadImage;
