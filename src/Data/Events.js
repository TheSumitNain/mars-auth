import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Slider from "react-slick";

export const ref = firebase.firestore().collection("post");

const Events = () => {
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
    data2 = 2;
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
      <div className="events_box">
        <div className="events">
          <h2> EVENTS </h2>
        </div>
        <Slider {...settings}>
          {data.map((dev) => {
            return (
              <div>
                <div className="inner">
                  <div className="user">
                    <img src={dev.img} alt="pic" />
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

export default Events;
