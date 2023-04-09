import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Slider from "react-slick";

const ref = firebase.firestore().collection("testimonials");

const Testimonials = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(window.screen.width);

  function getData() {
    ref.onSnapshot((queryShatshot) => {
      const items = [];
      queryShatshot.forEach((doc) => {
        items.push(doc.data());
      });
      setData(items);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const actualSize = () => {
    setState(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", actualSize);
  });

  let data2;
  if (state <= 700) {
    data2 = 1;
  } else if (state >= 700 && state <= 1000) {
    data2 = 2;
  } else {
    data2 = 3;
  }

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: data2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  function DeleteDoc(id) {
    ref
      .doc(id)
      .delete()
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      <div className="testimony_box">
        <div className="testimony">
          <h2> TESTIMONIALS </h2>
        </div>
        <Slider {...settings}>
          {data.map((dev) => {
            return (
              <div>
                <div className="inner">
                  <div className="user">
                    <p> {dev.message} </p>
                    <div className="testimony_pic_name">
                      <div className="user_left">
                        <img src={dev.img} alt="pic" />
                      </div>
                      <div className="user_right">
                        <h3> {dev.name} </h3>
                        <h4>{dev.city}</h4>
                      </div>
                    </div>
                    <button onClick={() => DeleteDoc(dev.id)}>Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default Testimonials;
