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

import { useHistory } from "react-router-dom";

const Add_product = (props) => {
  const [cookies] = useCookies(["token"]);
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState([]);
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
      userId: user.id,
      categoryId: "",
      subCategoryId: "",
      cityId: "",
      title: "",
      description: "",
      ownerName: "",
      ownerPhoneNumber: "",
      ownerAddress: "",
    },
    validationSchema: validateAddProduct,
    onSubmit: (values) => {
      const formData = {
        ...values,
        userId: user.id,
        files: file.map((item) => item.file),
      };
      postAddProduct(cookies.token, formData).then(() => {
        history.push("/");
      });
    },
  });

  const handleChangeImg = (event, date) => {
    const filesArr = [...file];
    for (const item of event.target.files) {
      filesArr.push({
        urlFront: URL.createObjectURL(item),
        file: item,
      });
    }
    setFile(filesArr);
  };

  const handleProductItemDelete = (index) => {
    const deletedItemImg = file.splice(index, 1);
    const newArray = file.filter((value) => value != deletedItemImg);
    setFile(newArray);
  };
  console.log("file", file);
  return (
    <section id="add_product">
      <div className="container">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="inputs">
                  <label className="required" htmlFor="">
                    Kategoriya
                  </label>
                  <select
                    className="select"
                    value={categoryId}
                    name="categoryId"
                    onChange={(e) => {
                      handleChange(e);
                      handleSelectedCategory(e);
                    }}
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
                    onChange={handleChange}
                  >
                    <option value="0">Sub kateqoriya seçin</option>
                    {subCategories.map((subCategory, index) => {
                      if (subCategory.categoryId === Number(selectedCategory)) {
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
                  <div className="inputs_inside">
                    <input
                      className="input"
                      type="text"
                      placeholder="elanın adını qeyd edin"
                      name="title"
                      onChange={handleChange}
                      value={title}
                    />
                    {errors.title && (
                      <Alert
                        variant="warning"
                        style={{ fontSize: "11px" }}
                        className="mb-0"
                      >
                        {errors.title}
                      </Alert>
                    )}
                  </div>
                </div>
                <div className="inputs">
                  <label className="required" htmlFor="">
                    Məzmun
                  </label>
                  <div className="inputs_inside">
                    <textarea
                      name="description"
                      onChange={handleChange}
                      value={description}
                    ></textarea>
                    {errors.description && (
                      <Alert
                        variant="warning"
                        style={{ fontSize: "11px" }}
                        className="mb-0"
                      >
                        {errors.description}
                      </Alert>
                    )}
                  </div>
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
                        onChange={(event) => handleChangeImg(event, new Date())}
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
                    <div className="uploadedImg">
                      {file.map((item, index) => (
                        <div className="productItem" key={index} id={index}>
                          <div className="productItemImg">
                            <img src={item.urlFront} className="mt-2" />
                            {index === 0 && (
                              <div className="d-flex justify-content-center align-items-center">
                                <img className="profileImg" src={profileImg} alt="" />
                                <span>Esas şəkil</span>
                              </div>
                            )}
                          </div>
                          <div
                            className="productItemImgDelete"
                            onClick={() => handleProductItemDelete(index)}
                          >
                            <img src={deleteIcon} alt={deleteIcon} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="inputs">
                  <label className="required" htmlFor="">
                    Adınız
                  </label>
                  <div className="inputs_inside">
                    <input
                      className="input"
                      type="text"
                      placeholder="adınızı qeyd edin"
                      name="ownerName"
                      onChange={handleChange}
                      value={ownerName}
                    />
                    {errors.ownerName && (
                      <Alert
                        variant="warning"
                        style={{ fontSize: "11px" }}
                        className="mb-0"
                      >
                        {errors.ownerName}
                      </Alert>
                    )}
                  </div>
                </div>
                <div className="inputs">
                  <label className="required" htmlFor="">
                    Nömrə
                  </label>
                  <div className="inputs_inside">
                    <input
                      className="input"
                      type="text"
                      name="ownerPhoneNumber"
                      onChange={handleChange}
                      value={ownerPhoneNumber}
                      placeholder="nömrənizi qeyd edin"
                    />
                    {errors.ownerPhoneNumber && (
                      <Alert
                        variant="warning"
                        style={{ fontSize: "11px" }}
                        className="mb-0"
                      >
                        {errors.ownerPhoneNumber}
                      </Alert>
                    )}
                  </div>
                </div>
                <div className="inputs">
                  <label className="required" htmlFor="">
                    Adress
                  </label>
                  <div className="inputs_inside">
                    <input
                      className="input"
                      type="text"
                      name="ownerAddress"
                      onChange={handleChange}
                      value={ownerAddress}
                      placeholder="adress qeyd edin"
                    />
                    {errors.ownerAddress && (
                      <Alert
                        variant="warning"
                        style={{ fontSize: "11px" }}
                        className="mb-0"
                      >
                        {errors.ownerAddress}
                      </Alert>
                    )}
                  </div>
                </div>

                <button className="light-btn">Əlavə et</button>
              </form>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Add_product;
