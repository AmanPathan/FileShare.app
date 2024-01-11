import './App.css';
import React, { useRef, useState, useEffect } from 'react';
// import { uploadFile } from './services/api';
import { useNavigate } from 'react-router-dom';
import upload_icon from './images/upload.png';
import pdf_icon from './images/folder1.png';
import link_icon from './images/link.png';
import copy_icon from './images/copy1.png';
import check_icon from './images/check.png';
import cross_icon from './images/cross.png';
import upload_btn from './images/upload_btn.png';

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const App = () => {
  const navigate = useNavigate();

  const maxSizeAllowed = 100 * 1024 * 1024;
  const fileInputRef = useRef();

  const [fileLink, setFileLink] = useState('');
  const [id, setUUID] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const [fileSize, setFileSize] = useState(0);

  const [file, setFile] = useState();
  const [result, setResult] = useState([]);
  const [filename, setFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('none');

  const handleClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setFileSize(event.target.files[0].size);
      setFileName(event.target.files[0].name);
    }
  };

  const [classFlag, setClassFlag] = useState(false);

  const handleDragIn = (event) => {
    event.preventDefault();
    setClassFlag(true);
  }
  const handleDragOut = (event) => {
    event.preventDefault();
    setClassFlag(false);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setClassFlag(false);
    const files = e.dataTransfer.files;
    setFileName(files[0].name);
    setSelectedFile(e.dataTransfer.files[0]);
    setFileSize(e.dataTransfer.files[0].size);
  }

  const clearFileInput = () => {
    fileInputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus('none');
  }
  const handleUpload = async () => {
    if (fileSize > maxSizeAllowed) {
      toast.error("Can't Upload More Than 100mb");
      clearFileInput();
      return;
    }
    if (uploadStatus === 'done') {
      setUploadStatus('done');
      clearFileInput();
      navigate(`/files/${id}`);
      return;
    }
    const BASE_URL = 'https://fileshare-app-8e4k.onrender.com';
    try {
      setUploadStatus('uploading');
      const formData = new FormData();
      formData.append("file", selectedFile);
      // console.log(formData); 8000
      const response = await axios.post(`http://localhost:8000/api/files`, formData, {
        onUploadProgress: (progressEvent) => {
          const percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentageCompleted);
          if (percentageCompleted === 100) {
            setUploadStatus('done');
            toast.success('File Uploaded Sucessfully');
          }
        }
      }
      );
      setUUID(response.data._id);
      toast(
        "Wait for a While",
        {
          duration: 1000,
        }
      );
      console.log(id);
    }
    catch (error) {
      setUploadStatus('none');
    }
  }

  // const getUUID = async () => {
  //   const res = await axios.get(fileLink)
  //     .then(res => {
  //       setUUID(res.data.uuid);
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  // }
  // getUUID();
  if (id) {
    setTimeout(() => {
      navigate(`/files/${id}`);
    }, 1000);
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="container">
        <div className="container-center">
          <div className={!classFlag ? "upload-container" : "upload-container-drag"} onDragOver={handleDragIn} onDragLeave={handleDragOut} onDrop={handleDrop}>

            <div className='heading'>
              <img className="upload-icon" src={upload_icon} />
              <h3>Drag and Drop Your File Here</h3>
              <p className='or'>or</p>
            </div>
            <div className="input_div">
              <button onClick={handleClick} className='upload-btn'>Browse</button>
              <input className='input' type="file" ref={fileInputRef} onChange={handleFileChange} />
            </div>
          </div>
          {selectedFile && (
            <div className="after-upload">
              <img src={pdf_icon} className='file_logo' />
              <div className='file_status_div'>
                <div className="progress_div">
                  <p className='file_name file_name_crop'>{filename}</p>
                  <p className='file_name'>{progress}%</p>
                </div>
                <div className='loader_div'>
                  <div className="loader" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              {(uploadStatus === 'uploading') ?
                <div className='icon_div'>
                  <img className="cross-icon" src={cross_icon} onClick={clearFileInput} />
                </div> : ""}
              {(uploadStatus === 'none' && progress < 100) ?
                <div className="upload_final_btn" onClick={handleUpload}>
                  <img className="cross-icon1" src={upload_btn} />
                  <p>Upload</p>
                </div> : ""}
              {(uploadStatus === 'done' || progress === 100) ? <div className='icon_div'><img className="cross-icon" src={check_icon} /></div> : ""}
            </div>
          )}

          {/* <div className="link-box">
            <div className='link_div'>
              <img src={link_icon} className='copy_icon' />
              <a href='#' className='link'>{file_link}</a>
            </div>
            <img src={copy_icon} onClick={() => { navigator.clipboard.writeText(file_link); toast.success('Copied to Clipboard')  }} className='copy_icon1' alt='copy link' />
          </div> */}

        </div>
      </div>
    </>
  );
}

export default App;
