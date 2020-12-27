import React, { useState, useEffect, useCallback } from "react";
import "./index.scss";
import getCategories from "../../API/getCategories";
import getSubCategories from "../../API/getSubCategories";
import getCities from "../../API/getCities";
import { useFormik } from "formik";
import validateUpdateProduct from "../../utils/yup/validateUpdateProduct";
import getUserByToken from "../../API/getUserByToken";
import { useCookies } from "react-cookie";
import { Alert } from "react-bootstrap";
import deleteIcon from "../../img/add_product/delete.png";
import profileImg from "../../img/add_product/profileImg.png";
import putUpdateProduct from "../../API/putUpdateProduct";
import InputMask from "react-input-mask";
import swal from "sweetalert";

import { useHistory } from "react-router-dom";
import getProductById from "../../API/getProductById";

import Resizer from "react-image-file-resizer";
import ButtonCustom from "../../utils/Button/Button";
import BackdropCustom from "../../utils/Backdrop/Backdrop";
import Footer from "../../layout/Footer";

const Update_product = (props) => {
  const [cookies] = useCookies(["token"]);
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [file, setFile] = useState([]);
  const [product, setProduct] = useState({});
  const [deletePhotoByIds, setDeletePhotoByIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const history = useHistory();

  useEffect(() => {
    getProductById(props.match.params.id).then((response) => {
      if (response.status === 200) {
        setProduct(response.data.data);
      }
    });
    getCategories().then((response) => setCategories(response.data.data));
    getSubCategories().then((response) => setSubCategories(response.data.data));
    getCities().then((response) => setCities(response.data.data));
    getUserByToken(cookies.token).then((responseUser) => {
      if (responseUser.status === 200) {
        setUser(responseUser.data.data);
      }
    });
  }, [cookies.token]);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    dirty,
    values: {
      userId,
      categoryId,
      subCategoryId,
      cityId,
      title,
      description,
      ownerName,
      ownerPhoneNumber,
      ownerAddress,
    },
    errors,
  } = useFormik({
    initialValues: {
      id: product.id || "",
      userId: user.id || "",
      categoryId: product.categoryId || "",
      subCategoryId: product.subCategoryId || "",
      cityId: product.cityId || "",
      title: product.title || "",
      description: product.description || "",
      ownerName: product.ownerName || "",
      ownerPhoneNumber: product.ownerPhoneNumber || "",
      ownerAddress: product.ownerAddress || "",
    },
    validationSchema: validateUpdateProduct,
    // validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (values) => {

      const phone = values.ownerPhoneNumber
        .split("-")
        .join("")
        .split(" ")
        .join("")
        .split("(")
        .join("")
        .split(")")
        .join("");
      const formData = {
        ...values,
        userId: user.id,
        id: product.id,
        files: file.map((item) => item.file),
        ownerPhoneNumber: phone,
        deletePhotoByIds: deletePhotoByIds,
      };
      if (product.photos && (product.photos[0] || file[0])){
        setIsLoading(true);
        putUpdateProduct(cookies.token, formData).then(() => {
          setIsLoading(false);
          swal(
              "Elanınız moderatora göndərildi",
              "Elanda olan dəyişikliklər yoxlandıqdan sonra elan yenilənəcək",
              "success",
              {
                button: "Bağla",
              }
          ).then(() => {
            // history.push("/");
            history.go(-1)
          });
        });
      }
    },
  });

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        600,
        600,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const handleChangeImg = async (event, date) => {
    const filesArr = [...file];
    for (const item of event.target.files) {
      let typeEvent = item.type.substring(item.type.indexOf("/")+1);
      if (typeEvent == "HEIF" || typeEvent == "HEIC" || typeEvent == "jpg" || typeEvent == "jpeg" || typeEvent == "gif" || typeEvent == "png"){
        const image = await resizeFile(item);
        let minimazePhoto = dataURLtoFile(image, item.name);
        filesArr.push({
          urlFront: URL.createObjectURL(minimazePhoto),
          file: minimazePhoto,
        });
      }
    }
    setFile(filesArr);
  };

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleProductItemDelete = (index) => {
    const deletedItemImg = file.splice(index, 1);
    const newArray = file.filter((value) => value != deletedItemImg);
    setFile(newArray);
  };

  const handleAPIProductItemDelete = (item, index) => {
    setDeletePhotoByIds((oldState) => [...oldState, item.id]);
    delete product.photos[index];
  };

  return (
    <>
        <section id="add_product">
          {isLoading && <BackdropCustom/>}
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="wrapper">
                  <div className="header">
                    <h3>Elanı dəyiş</h3>
                  </div>
                  <div className="form">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Kategoriya
                            </label>
                            <select
                              className="select"
                              value={categoryId}
                              name="categoryId"
                              id="categoryId"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              onBlur={handleBlur}
                            >
                              <option value="0">Kategoriya seçin</option>
                              {categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Sub kategoriya
                            </label>
                            <select
                              className="select"
                              value={subCategoryId}
                              name="subCategoryId"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              disabled={
                                subCategories.filter(
                                  (x) => x.categoryId == categoryId
                                ).length == 0
                              }
                            >
                              <option value="0">Sub kateqoriya seçin</option>
                              {subCategories.map((subCategory, index) => {
                                if (subCategory.categoryId == categoryId) {
                                  return (
                                    <option key={index} value={subCategory.id}>
                                      {subCategory.name}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                          </div>
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Şəhər
                            </label>
                            <select
                              className="select"
                              value={cityId}
                              name="cityId"
                              onChange={handleChange}
                            >
                              <option value="0">Şəhər seçin</option>
                              {cities.map((city, index) => {
                                return (
                                  <option key={index} value={city.id}>
                                    {city.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Elanın adı
                            </label>

                            <input
                              className="input"
                              type="text"
                              placeholder="elanın adını qeyd edin"
                              name="title"
                              onChange={handleChange}
                              defaultValue={product.title}
                            />
                            {errors.title && (
                              <Alert variant="warning">{errors.title}</Alert>
                            )}
                          </div>
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Məzmun
                            </label>

                            <textarea
                              name="description"
                              onChange={handleChange}
                              defaultValue={product.description}
                            ></textarea>
                            {errors.description && (
                              <Alert variant="warning">
                                {errors.description}
                              </Alert>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Adınız
                            </label>

                            <input
                              className="input"
                              type="text"
                              placeholder="adınızı qeyd edin"
                              name="ownerName"
                              onChange={handleChange}
                              value={ownerName}
                            />
                            {errors.ownerName && (
                              <Alert variant="warning">
                                {errors.ownerName}
                              </Alert>
                            )}
                          </div>
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Nömrə
                            </label>

                            {/* <input
                              className="input"
                              type="text"
                              name="ownerPhoneNumber"
                              onChange={handleChange}
                              value={ownerPhoneNumber}
                              placeholder="nömrənizi qeyd edin"
                          /> */}
                            <InputMask
                              placeholder="Telefon nomrənizi qeyd edin"
                              name="ownerPhoneNumber"
                              id="phoneNumber"
                              className="input"
                              onChange={handleChange}
                              value={ownerPhoneNumber}
                              mask="+\9\94 (99) 999-99-99"
                            />
                            {errors.ownerPhoneNumber && (
                              <Alert variant="warning">
                                {errors.ownerPhoneNumber}
                              </Alert>
                            )}
                          </div>
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Adress
                            </label>

                            <input
                              className="input"
                              type="text"
                              name="ownerAddress"
                              onChange={handleChange}
                              value={ownerAddress}
                              placeholder="adress qeyd edin"
                            />
                            {errors.ownerAddress && (
                              <Alert variant="warning">
                                {errors.ownerAddress}
                              </Alert>
                            )}
                          </div>
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Şəkil
                            </label>
                            <div className="file-input">
                              <div className="file-input-choose">
                                <input
                                  type="file"
                                  className="input"
                                  id="imageUpload"
                                  multiple={true}
                                  onChange={(event) =>
                                    handleChangeImg(event, new Date())
                                  }
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
                              {product.photos &&
                                !product.photos.filter(
                                  (x) => x.status == "Created"
                                )[0] &&
                                !file[0] && (
                                  <Alert variant="warning">
                                    Ən azı bir şəkil yüklənməlidir.
                                  </Alert>
                                )}
                              <div className="uploadedImg">
                                {product.photos &&
                                  product.photos.map((item, index) => {
                                    if (item.status === "Created") {
                                      return (
                                        <div
                                          className="productItem"
                                          key={index}
                                          id={index}
                                        >
                                          <div className="productItemImg">
                                            <img
                                              src={`https://pricegroup.az/api/productimage/${item.path}`}
                                              className="mt-2"
                                            />
                                            {index === 0 && (
                                              <div className="d-flex justify-content-center align-items-center">
                                                <img
                                                  className="profileImg"
                                                  src={profileImg}
                                                  alt=""
                                                />
                                                <span>Esas şəkil</span>
                                              </div>
                                            )}
                                          </div>
                                          <div
                                            className="productItemImgDelete"
                                            onClick={() =>
                                              handleAPIProductItemDelete(
                                                item,
                                                index
                                              )
                                            }
                                          >
                                            <img
                                              src={deleteIcon}
                                              alt={deleteIcon}
                                            />
                                          </div>
                                        </div>
                                      );
                                    }
                                  })}

                                {file.map((item, index) => (
                                  <div
                                    className="productItem"
                                    key={index}
                                    id={index}
                                  >
                                    <div className="productItemImg">
                                      <img
                                        src={item.urlFront}
                                        className="mt-2"
                                      />
                                      {/*{index === 0 && (*/}
                                      {/*    <div className="d-flex justify-content-center align-items-center">*/}
                                      {/*      <img*/}
                                      {/*          className="profileImg"*/}
                                      {/*          src={profileImg}*/}
                                      {/*          alt=""*/}
                                      {/*      />*/}
                                      {/*      <span>Esas şəkil</span>*/}
                                      {/*    </div>*/}
                                      {/*)}*/}
                                    </div>
                                    <div
                                      className="productItemImgDelete"
                                      onClick={() =>
                                        handleProductItemDelete(index)
                                      }
                                    >
                                      <img src={deleteIcon} alt={deleteIcon} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/*<button*/}
                          {/*    type="submit"*/}
                          {/*    className="submit"*/}
                          {/*>*/}
                          {/*  Təsdiqlə*/}
                          {/*</button>*/}
                          <ButtonCustom title="Təsdiqlə" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      <Footer/>
    </>
  );
};

export default Update_product;
