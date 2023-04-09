import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import firebase from "../firebase";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ref2 = firebase.firestore().collection("testimonials");

const Createtestimony = () => {
  const [file, setFile] = useState("");
  const [per, setPer] = useState(null);
  const [error, setError] = useState("");
  const [state, setState] = useState({
    name: "",
    city: "",
    message: "",
  });

  useEffect(() => {
    const UploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPer(progress);
          setFile("");
        },

        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setState((preval) => ({ ...preval, img: downloadURL }));
          });
        }
      );
    };

    file && UploadFile();
  }, [file]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const submitData = (e) => {
    e.preventDefault();
    const { name, email, message } = state;

    if (name && email && message && file) {
      const data = { ...state, id: uuidv4() };
      ref2.doc(data.id).set(data);

      setState({ name: "", city: "", message: "" });
      setFile("");
      alert("Data sent successfully");
    } else {
      setError("Please fill all input properly");
    }
  };

  return (
    <>
      <div className="create_testimony_form">
        <h1>Testimony Form</h1>
        <form onSubmit={submitData}>
          <input
            type="file"
            placeholder="Upload file"
            onChange={(e) => setFile(e.target.files[0])}
          />{" "}
          <br /> <br />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={state.name}
            onChange={handleInput}
          />{" "}
          <br /> <br />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={state.city}
            onChange={handleInput}
          />{" "}
          <br /> <br />
          <textarea
            type="text"
            placeholder="Message"
            name="message"
            value={state.message}
            onChange={handleInput}
          />
          <br />
          {error && (
            <h4 className="error">
              <br /> {error}
            </h4>
          )}
          <button disabled={per !== null && per < 100} type="submit">
            Upload
          </button>
          <br /> <br />
        </form>
      </div>
    </>
  );
};

export default Createtestimony;
