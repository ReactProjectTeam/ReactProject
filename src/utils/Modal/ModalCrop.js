import React, {useState} from "react";
import {Modal,Button} from "react-bootstrap";
import Cropper from "react-easy-crop";
import "./index.scss";


function ModalCrop({show,handleClose,classes,imageSrc,crop,rotation,zoom,setCrop,setRotation,onCropComplete,showCroppedImage,setZoom,croppedImage}) {

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Şəkilin düzəlməsi</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <React.Fragment>
                        <div className={classes.cropContainer}>
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                    </React.Fragment>

                </Modal.Body>
                <Modal.Footer>
                    <div className="modalBtn">
                        <Button variant="secondary" className="closeModal" onClick={handleClose}>
                            Bağla
                        </Button>
                        <Button variant="primary" className="submit"  onClick={()=>{handleClose();showCroppedImage()}}>
                            Yadda saxla
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCrop;
