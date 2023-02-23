import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [fileToUpload, setFileToUpload] = useState(null);
  const [fileToShow, setFileToShow] = useState(null);

  const changeFileToUpload = event => {
    setFileToUpload(event.target.files[0]);
  }

  const uploadFile = () => {
    if (!fileToUpload) {
      return alert("Choose File first before clicking the Upload button");
    }
    const formData = new FormData();
    formData.append("image", fileToUpload);
    axios
      .post("http://localhost:8080/image", formData)
      .then(res => alert(res.data))
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  const getFile = () => {
    if (document.getElementById("imageName").value === "") {
      return alert("Image name cannot be empty")
    }
    axios
      .get("http://localhost:8080/image/" + document.getElementById("imageName").value)
      .then(res => setFileToShow(res.data))
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  const fileData = () => {
    if (fileToShow) {
      return (
        <div className="card mt-5 mx-auto" style={{ maxWidth: "425px" }}>
          <img
            className="card-img-top"
            src={"data:image/png;base64," + fileToShow.image}
            alt={fileToShow.name}
          />
          <div className="card-body">
            <h5 className="card-title">{fileToShow.name}</h5>
            <p className="card-text">{fileToShow.type}</p>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <h3 className="text-center bg-dark text-white py-3">Image Upload</h3>
      <div className="mx-auto" style={{ maxWidth: "768px" }}>
        <div className='mt-5 text-center'>
          <input
            type="file"
            className="form-control"
            onChange={changeFileToUpload}
            onClick={(event) => event.target.value = ""}
          />
          <button type="button" className="btn btn-success mt-3" onClick={uploadFile}>
            Upload
          </button>
        </div>
        <hr className="mt-5" />
        <div className="mt-5 d-flex">
          <input
            type="text"
            className="form-control me-4"
            id="imageName"
            placeholder="Image name (including extension)"
            aria-label="image name"
          />
          <button type="button" className='btn btn-info' onClick={getFile}>Get&nbsp;Image</button>
        </div>
        {fileData()}
        <hr className="mt-5" />
      </div>
    </div>
  );
}

export default App;
