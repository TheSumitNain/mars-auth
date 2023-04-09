import React from "react";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Testimonials from "../Data/Testimonials";
import Review from "../Data/Review";
import Events from "../Data/Events";
import Createpost from "../Create/Createpost";
import Createtestimony from "../Create/Createtestimony";
import logo from "../images/logo2.jpeg";

const Home = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  console.log(user);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <div className="home_main">
        <img src={logo} alt="logo" />
        <button onClick={handleLogOut}>Log out</button>
      </div>
      <div className="rules">
        <h4>Instruction:-</h4>
        <ul>
          <li>
            Remove any data carefully, because this operation directly connected
            with database. If you deleted any data once, that will be removed
            permanently.
          </li>
          <li>
            If, In any category data eg.(Testimonials, Events or Reviews),
            you've less than three cards, a copy of that category data will also
            display. That is the rule of Carousel, it's not a problem.
          </li>
          <li>
            Upload button will not working untill file field is empty or during
            uploading (remains disabled).
          </li>
          <li>
            Please do not select any file, Untill you are not sure. File store
            first in the storage, before uploading to database. Storage is free
            only for limited size.
          </li>
          <li>Please do not select unwanted file in "Choose File" field.</li>
        </ul>
      </div>
      <div className="home_form">
        <div className="home_form_2">
          <Createtestimony />
        </div>
        <div className="home_form_1">
          <Createpost />
        </div>
      </div>
      <Testimonials />
      <Review />
      <Events />

      <div className="footer">
          <p>Mars overseas</p>
      </div>
    </>
  );
};

export default Home;
