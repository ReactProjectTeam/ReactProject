import React from "react";
import payverLogo from "../../img/footer/payverLogoFooter.png";
import "./index.scss";

const Footer = ({
  products,
  all_products,
  signin,
  signup,
  confirm,
  confirmPassword,
  forgotPassword,
  notFound,
  errorsEmail,
  errorsPassword,
  errorsConfirmPassword,
  productDetails,
  isLoadingProductDetails,
}) => {

  return (
    <>
      <footer
        className={
          errorsEmail ||
          errorsPassword ||
          errorsConfirmPassword ||
          !isLoadingProductDetails
            ? "minimumProductStyleStatic"
            : ((signin ||
                signup ||
                confirm ||
                confirmPassword ||
                productDetails ||
                forgotPassword ||
                notFound) &&
                "minimumProductStyle") ||
              (products && products.length < 3 ? "minimumProductStyle" : "")
        }
      >
        <div className="container">
          <div className="wrapper">
            <div className="row justify-content-between">
              <div className="col-md-5 col-sm-6 col-6 align-self-start">
                <div className="social">
                  <div className="logo">
                    {/* <a href="index.html"><img src={logo} alt="" /></a> */}
                    <div id="sha_temp_body">
                      <span className="sha_temp">
                        <span>
                          <span className="temp-data">
                            {/*<img src={payverLogo} alt="Logo" />*/}
                            <img src={payverLogo} alt="Logo" />
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="description">
                    <p>Payver, sevinc bəxş et</p>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-sm-6 col-6">
                <div className="contact-subscribe">
                  <div className="contact_footer">
                    <div className="header-text">
                      <p>Əlaqə</p>
                    </div>
                    <ul>
                      <li>
                        <a href="https://mail.google.com/mail/u/0/?view=cm&amp;fs=1&amp;tf=1&amp;to=info@payver.az">
                          info@payver.az
                        </a>
                      </li>
                      <li>
                        <a href="tel:+994502782268">+994 50 278 22 68</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
