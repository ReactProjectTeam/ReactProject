import React, { useState, useEffect, useCallback } from "react";
import "./index.scss";
import getCategories from "../../API/getCategories";
import getSubCategories from "../../API/getSubCategories";
import getCities from "../../API/getCities";
import { useFormik } from "formik";
import validateAddProduct from "../../utils/yup/validateAddProduct";
import getUserByToken from "../../API/getUserByToken";
import { useCookies } from "react-cookie";
import { Alert } from "react-bootstrap";
import deleteIcon from "../../img/add_product/delete.png";
import profileImg from "../../img/add_product/profileImg.png";
import postAddProduct from "../../API/postAddProduct";
import InputMask from "react-input-mask";
import swal from "sweetalert";

import Resizer from "react-image-file-resizer";

import { useHistory } from "react-router-dom";
import ButtonCustom from "../../utils/Button/Button";
import BackdropCustom from "../../utils/Backdrop/Backdrop";
import Footer from "../../layout/Footer";

const Add_product = (props) => {
  const [cookies] = useCookies(["token"]);
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genders, setGenders] = useState([
    // {
    //   id: "All",
    //   name: "Hamısı"
    // },
    {
      id: "Man",
      name: "Kişi"
    },
    {
      id: "Woman",
      name: "Qadın"
    },
    {
      id: "Boy",
      name: "Uşaq(oğlan)"
    },
    {
      id: "Girl",
      name: "Uşaq(qiz)"
    },
  ]);

  const history = useHistory();

  useEffect(() => {
    getCategories().then((response) => setCategories(response.data.data));
    getSubCategories().then((response) => setSubCategories(response.data.data));
    getCities().then((response) => setCities(response.data.data));
    getUserByToken(cookies.token).then((responseUser) => {
      if (responseUser.status === 200) {
        setUser(responseUser.data.data);
      }
    });
  }, [file, cookies.token]);

  const handleSelectedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values: {
      userId,
      categoryId,
      subCategoryId,
      gender,
      cityId,
      title,
      description,
      ownerName,
      ownerPhoneNumber,
      ownerAddress,
    },
    errors,
    touched,
  } = useFormik({
    initialValues: {
      userId: user.id,
      categoryId: "",
      subCategoryId: "",
      gender: "",
      cityId: "",
      title: "",
      description: "",
      ownerName: "",
      ownerPhoneNumber: "",
      ownerAddress: "",
    },
    validationSchema: validateAddProduct,
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
        files: file.map((item) => item.file),
        ownerPhoneNumber: phone,
      };
      if ( file.length > 0){
        setIsLoading(true);
        postAddProduct(cookies.token, formData).then(() => {
          setIsLoading(false);
          swal(
              "Elanınız moderatora göndərildi",
              "Elanınız təsdiqləndikdən sonra paylaşılacaq",
              "success",
              {
                button: "Bağla",
              }
          ).then(() => {
            history.push("/");
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
  return (
    <>
        <section id="add_product">
          {isLoading && <BackdropCustom/>}

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="wrapper">
                  <div className="header">
                    <h3>Elan yerləşdir</h3>
                  </div>
                  <div className="form">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Kategoriya
                            </label>
                            {/*<div className="inputs_inside">*/}
                            <select
                              className="select"
                              value={categoryId}
                              name="categoryId"
                              onChange={(e) => {
                                handleChange(e);
                                handleSelectedCategory(e);
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
                            {errors.categoryId && touched.categoryId && (
                              <Alert variant="warning">
                                {errors.categoryId}
                              </Alert>
                            )}
                            {/*</div>*/}
                          </div>
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Sub kategoriya
                            </label>
                            {/*<div className="inputs_inside">*/}
                            <select
                              className="select"
                              value={subCategoryId}
                              name="subCategoryId"
                              onChange={handleChange}
                              disabled={Number(selectedCategory) === 12 && true}
                            >
                              <option value="0">Sub kateqoriya seçin</option>
                              {subCategories.map((subCategory, index) => {
                                if (
                                  subCategory.categoryId ===
                                  Number(selectedCategory)
                                ) {
                                  return (
                                    <option key={index} value={subCategory.id}>
                                      {subCategory.name}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                            {errors.subCategoryId && touched.subCategoryId && (
                              <Alert variant="warning">
                                {errors.subCategoryId}
                              </Alert>
                            )}
                            {/*</div>*/}
                          </div>
                          {
                            Number(selectedCategory) === 9 && (
                                <div className="inputs">
                                  <label className="required" htmlFor="">
                                    Cins
                                  </label>
                                  {/*<div className="inputs_inside">*/}
                                  <select
                                      className="select"
                                      value={gender}
                                      name="gender"
                                      onChange={handleChange}
                                  >
                                    <option value="0">Cins seçin</option>
                                    {genders.map((genderİtem, index) => {
                                      return (
                                          <option key={index} value={genderİtem.id}>
                                            {genderİtem.name}
                                          </option>
                                      );
                                    })}
                                  </select>
                                  {/*{errors.cityId && touched.cityId && (*/}
                                  {/*    <Alert variant="warning">{errors.cityId}</Alert>*/}
                                  {/*)}*/}
                                  {/*</div>*/}
                                </div>
                            )
                          }


                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Şəhər
                            </label>
                            {/*<div className="inputs_inside">*/}
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
                            {errors.cityId && touched.cityId && (
                              <Alert variant="warning">{errors.cityId}</Alert>
                            )}
                            {/*</div>*/}
                          </div>
                          <div className="inputs">
                            <label className="required" htmlFor="title">
                              Elanın adı
                            </label>
                            {/*<div className="inputs_inside">*/}
                            <input
                              className="input"
                              type="text"
                              placeholder="Elanın adını qeyd edin"
                              name="title"
                              id="title"
                              onChange={handleChange}
                              value={title}
                            />

                            {errors.title && (
                              <Alert variant="warning">{errors.title}</Alert>
                            )}
                            {/*</div>*/}
                          </div>
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Məzmun
                            </label>
                            {/*<div className="inputs_inside">*/}
                            <textarea
                              name="description"
                              onChange={handleChange}
                              value={description}
                            ></textarea>
                            {errors.description && (
                              <Alert variant="warning">
                                {errors.description}
                              </Alert>
                            )}
                            {/*</div>*/}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Adınız
                            </label>
                            {/*<div className="inputs_inside">*/}
                            <input
                              className="input"
                              type="text"
                              placeholder="Adınızı qeyd edin"
                              name="ownerName"
                              onChange={handleChange}
                              value={ownerName}
                            />
                            {errors.ownerName && (
                              <Alert variant="warning">
                                {errors.ownerName}
                              </Alert>
                            )}
                            {/*</div>*/}
                          </div>
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Nömrə
                            </label>
                            {/*<div className="inputs_inside">*/}
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
                              type="tel"
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
                            {/*</div>*/}
                          </div>
                          <div className="inputs">
                            <label className="required" htmlFor="">
                              Adress
                            </label>
                            {/*<div className="inputs_inside">*/}
                            <input
                              className="input"
                              type="text"
                              name="ownerAddress"
                              onChange={handleChange}
                              value={ownerAddress}
                              placeholder="Adress qeyd edin"
                            />
                            {errors.ownerAddress && (
                              <Alert variant="warning">
                                {errors.ownerAddress}
                              </Alert>
                            )}
                            {/*</div>*/}
                          </div>
                          <div
                            className="inputs"
                            style={{ alignItems: "flex-start" }}
                          >
                            <label className="required mt-1" htmlFor="">
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

                              {file.length == 0 && (
                                <Alert variant="warning">
                                  Ən azı bir şəkil yüklənməlidir.
                                </Alert>
                              )}
                              <div className="uploadedImg">
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
                                      {index === 0 && (
                                        <div className="profileImgDiv d-flex justify-content-center align-items-center">
                                          <img
                                            className="profileImg"
                                            src={profileImg}
                                            alt=""
                                          />
                                          {/*<span>Esas şəkil</span>*/}
                                        </div>
                                      )}
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
                          {/*<button type="submit"  className="submit" >Əlavə et</button>*/}
                          <ButtonCustom title="Əlavə et" />
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

export default Add_product;
