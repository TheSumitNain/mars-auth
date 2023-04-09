import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import firebase from "../firebase";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ref3 = firebase.firestore().collection("post");

const Createpost = () => {
  const [file, setFile] = useState("");
  const [per, setPer] = useState(null);
  const [state, setState] = useState({});
  const [error, setError] = useState("");

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
          alert(error);
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

  const submitData = (e) => {
    e.preventDefault();
    setError("");
    if(file !== "") {
        const data = { ...state, id: uuidv4() };
    ref3.doc(data.id).set(data);
    setState({});
    setFile("");
    alert("Post uploaded successfully");
    } else {
        setError("Please upload file properly");
    }
  };

  return (
    <>
      <div className="create_post_form">
        <h1>Event Form</h1>
        <form onSubmit={submitData}>
          <input
            type="file"
            placeholder="Upload file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          {error && <h4 className='error'> <br /> {error}</h4>}
          <br />
          <button disabled={ per !== null && per < 100 } type="submit">
            Upload
          </button>
          <br /> <br />
        </form>
      </div>
      </>
  );
};

export default Createpost;
