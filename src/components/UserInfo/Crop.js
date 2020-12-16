import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
// import Slider from '@material-ui/core/Slider'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { getOrientation } from "get-orientation/browser";
import ImgDialog from "./ImgDialog";
import { getCroppedImg, getRotatedImage } from "./canvasUtils";
import { styles } from "./styles";
import ModalCrop from "../../utils/Modal/ModalCrop";

const ORIENTATION_TO_ANGLE = {
  "3": 180,
  "6": 90,
  "8": -90,
};

const Crop = ({ classes,getFileCropper }) => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [imageName, setImageName] = useState("");
  const [imageType, setImageType] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [show, setShow] = useState(false);
  const [fileEnded, setFileEnded] = useState([]);
  const [file, setFile] = useState([]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );

      setCroppedImage(croppedImage);
    } catch (e) {
      // console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageName(file.name)
      setImageType(file.type)
      let imageDataUrl = await readFile(file);
      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
        setFileEnded(new File([imageDataUrl],imageName,{type: imageType}))
      }
      setImageSrc(imageDataUrl);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    setFileEnded([new File([imageSrc],imageName,{type: imageType})])
  },[imageSrc]);


  useEffect(() => {
    getFileCropper(fileEnded)
  }, [fileEnded]);

  return (
    <div>
      {/*<input*/}
      {/*  type="file"*/}
      {/*  onChange={(e) => {*/}
      {/*    onFileChange(e);*/}
      {/*    handleShow();*/}
      {/*  }}*/}
      {/*  accept="image/*"*/}
      {/*/>*/}

      <div className="file-input-choose">
        <input
            type="file"
            className="input"
            id="imageUpload"
            // onChange={(event) =>
            //     handleChangeImg(event, new Date())
            // }
            onChange={(e) => {
              onFileChange(e);
              handleShow();
            }}
            onClick={(event) => {
              event.target.value = null;
            }}
            style={{ display: "none" }}
        />
        <label
            htmlFor="imageUpload"
            className="btn btn-large"
            className="inputFile"
        >
          Şəkil seçin
          {file.length !== 0 && (
              <span className="ml-2">{file.length}</span>
          )}
        </label>
      </div>

      {imageSrc && (
        <ModalCrop
          show={show}
          handleClose={handleClose}
          classes={classes}
          imageSrc={imageSrc}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          setCrop={setCrop}
          setRotation={setRotation}
          onCropComplete={onCropComplete}
          setZoom={setZoom}
          croppedImage={croppedImage}
          showCroppedImage={showCroppedImage}
        />
      )}
      <ImgDialog img={croppedImage} onClose={onClose} />
    </div>
  );
};
const StyledCrop = withStyles(styles)(Crop);

export default StyledCrop;

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
