import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
class Add_product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section id="add_product">
        <div className="container">
          <div className="wrapper">
            <div className="row">
              <div className="col-md-8">
                <form action="">
                  <div className="inputs">
                    <label className="required" htmlFor="">
                      Kategoriya
                    </label>
                    <select className="select">
                      <option value="0">Kateqoriya seçin</option>
                      <option value="1">Geyim</option>
                      <option value="2">Ev üçün</option>
                      <option value="3">Xüsusi yardim</option>
                      <option value="4">Heyvanlar</option>
                    </select>
                  </div>
                  <div className="inputs">
                    <label className="required" htmlFor="">
                      Sub kategoriya
                    </label>

                    <select className="select">
                      <option value="0">Sub kateqoriya seçin</option>
                      <option value="1">Papaq</option>
                      <option value="2">Kurtka</option>
                      <option value="3">Şalvar</option>
                      <option value="4">Ayaqqabı</option>
                    </select>
                  </div>
                  <div className="inputs">
                    <label className="required" htmlFor="">
                      Şəhər
                    </label>

                    <select className="select">
                      <option value="0">Şəhər seçin</option>
                      <option value="1">Bakı</option>
                      <option value="2">Qazax</option>
                      <option value="3">Gəncə</option>
                      <option value="4">Sumqayıt</option>
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
                    />
                  </div>
                  <div className="inputs">
                    <label className="required" htmlFor="">
                      Məzmun
                    </label>
                    <textarea name="" id=""></textarea>
                  </div>
                  <div className="inputs">
                    <p className="required" htmlFor="">
                      Şəkil
                    </p>
                    <div className="file-input">
                      <input type="file" />
                      <span className="button">Choose</span>
                      <span className="label" data-js-label>
                        No file selected
                      </span>
                    </div>
                  </div>
                  <div className="inputs">
                    <label className="required" htmlFor="">
                      Adınız
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="adınızı qeyd edin"
                    />
                  </div>
                  <div className="inputs">
                    <label className="required" htmlFor="">
                      Nömrə
                    </label>
                    <input
                      className="input"
                      type="text"
                      placeholder="nömrənizi qeyd edin"
                    />
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
  }
}

export default Add_product;
