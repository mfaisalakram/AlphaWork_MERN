import { data } from 'jquery';
import React, { Fragment } from 'react';
import image2 from '../../../src/img/unnamed.jpg';
import image3 from '../../../src/img/2020-11-02 7-28-53-1i will do design something  interesting for you.png';
import image4 from '../../../src/img/unnamed (1).jpg';
import './SellerDashboard.css';
import Slider from 'react-slick';

const SellerDashboard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
    // vertical: true,
    // verticalSwiping: true,
    // swipeToSlide: true,
  };

  const data1 = {
    imgPath2: image2,
  };
  return (
    <Fragment>
      <container>
        <div className="row">
          <div className="col-lg-4 col-sm-5 col-md-6">
            <div className="SellerProfileDiv">
              <img src={data1.imgPath2} className="SellerProfileImage"></img>
              <h4 style={{ textAlign: 'center' }}>
                <span>
                  <strong>Aftab Falak</strong>
                  <i
                    className="fa fa-star rating-star"
                    style={{ paddingLeft: '10px' }}
                  ></i>
                </span>
              </h4>

              <div className="SellerProfileMenu">
                <div className="row">
                  <div className="col-lg-6">
                    <div>
                      <strong>Response Time</strong>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="OuterBar">
                      <div className="InnerBar"> </div>
                    </div>
                  </div>

                  <div className="col-lg-2">
                    <div></div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div>
                      <strong>Delievery on Time</strong>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="OuterBar">
                      <div className="InnerBar"> </div>
                    </div>
                  </div>

                  <div className="col-lg-2">
                    <div></div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div>
                      <strong>Order Completion</strong>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="OuterBar">
                      <div className="InnerBar"> </div>
                    </div>
                  </div>

                  <div className="col-lg-2">
                    <div></div>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-lg-8">
                    <span>
                      <strong>Earned in January</strong>
                    </span>
                  </div>
                  <div className="col-lg-4">
                    <p>$2000</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-8">
                    <span>
                      <strong>Response Time</strong>
                    </span>
                  </div>
                  <div className="col-lg-4">
                    <p>1Hrs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>{' '}
          {/*End of left side div */}
          <div className="col-lg-8 col-sm-7 col-md-6">
            <div className="ActiveOrderRow">
              <div className="row">
                <div className="col-lg-6">
                  <span>
                    <p>
                      <strong>Active Orders: -1 ($480)</strong>
                    </p>
                  </span>
                </div>

                <div className="col-lg-6 ">
                  <div className="ActiveOrderDropDown">
                    <li className="dropdown" style={{ listStyle: 'none' }}>
                      <a
                        href="#"
                        className="dropdown-toggle"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        All Orders<b className="caret"></b>
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a href="index.html">Home #1</a>
                        </li>
                        <li>
                          <a href="index-2.html">Home #2</a>
                        </li>
                        <li>
                          <a href="index-3.html">Home #3</a>
                        </li>
                      </ul>
                    </li>
                  </div>
                </div>
              </div>
            </div>{' '}
            {/*end of ActiveOrderRow div */}
            <div className="ActiveOrderDescription">
              <div className="row">
                <div className="col-lg-4">
                  <span>
                    <img
                      src={image3}
                      style={{
                        width: '30%',
                        padding: '5px 3px 5px 3px',
                        borderRadius: '2px',
                      }}
                    ></img>
                    <img
                      src={image4}
                      style={{
                        width: '20%',
                        padding: '5px 3px 5px 9px',
                        borderRadius: '50%',
                      }}
                    ></img>
                    <span style={{ paddingLeft: '10px' }}>
                      <strong>Jahanzaib</strong>
                    </span>
                  </span>
                </div>

                <div className="col-lg-2">
                  <div style={{ marginTop: '8px' }}>
                    <div>
                      <strong style={{ color: 'green' }}>Price:</strong>
                    </div>
                    <div>
                      <strong>$45</strong>
                    </div>
                  </div>
                </div>

                <div className="col-lg-2">
                  <div style={{ marginTop: '8px' }}>
                    <div>
                      <strong style={{ color: 'green' }}>Due In:</strong>
                    </div>
                    <div>
                      <strong>16d,15h</strong>
                    </div>
                  </div>
                </div>

                <div className="col-lg-2">
                  <div style={{ marginTop: '8px' }}>
                    <div>
                      <strong style={{ color: 'green' }}>Status</strong>
                    </div>
                    <div
                      style={{
                        border: '1px solid black',
                        borderRadius: '9px',
                        backgroundColor: 'purple',
                        color: 'white',
                        textAlign: 'center',
                        cursor: 'context-menu',
                      }}
                    >
                      <text>In Progress</text>
                    </div>
                  </div>
                </div>

                <div className="col-lg-2">
                  <div style={{ marginTop: '20px' }}>
                    <h5>
                      <strong
                        style={{
                          color: 'green',
                          paddingLeft: '45px',
                          cursor: 'pointer',
                        }}
                      >
                        View
                      </strong>
                    </h5>
                  </div>
                </div>
              </div>
            </div>{' '}
            {/*end of ActiveOrderDescription div */}
            {/* 
                        <div style={{marginTop:"40px",marginRight:"95px"}}> 
                                    <Slider {...settings}>
                                        <div className="slide">
                                            <img src={data1.imgPath2}></img>
                                        </div>
                                        <div className="slide">
                                            <img src={data1.imgPath2}></img>
                                        </div>
                                        <div className="slide">
                                            <img src={data1.imgPath2}></img>
                                        </div>
                                        <div className="slide">
                                            <img src={data1.imgPath2}></img>
                                        </div>
                                        <div className="slide">
                                            <img src={data1.imgPath2}></img>
                                        </div>
                                        <div className="slide">
                                            <img src={data1.imgPath2}></img>
                                        </div>
                                    </Slider>
                                </div>         */}
          </div>{' '}
          {/*End of Right side div */}
        </div>
      </container>
    </Fragment>
  );
};

export default SellerDashboard;
