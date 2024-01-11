import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import download_icon from '../images/download.png';
import download_icon1 from '../images/download1.png';
import download from '../images/download.gif';
import success_icon from '../images/success.png';
import copy_icon from '../images/copy1.png';
import doc_icon from '../images/doc.png';
import img_404 from '../images/404.png';
import goback_icon from '../images/goback.png';

import { useNavigate } from 'react-router-dom';

const Download = () => {
    const navigate = useNavigate();

    const { uuid } = useParams();
    const [errorFlag, setErrorFlag] = useState(false);
    const [fileData, setFileData] = useState([]);
    const [fileName, setFileName] = useState('');
    const [fileLink, setFileLink] = useState('');
    const [fileSize, setFileSize] = useState('');

    const fetchUsers = async () => {
        axios.get(`http://localhost:8000/files/${uuid}`)
            .then((res) => {
                setFileData(res.data);
                setFileName(res.data.fileName);
                setFileSize(res.data.fileSize);
                setFileLink(res.data.download);
            }).catch((err) => {
                console.log("Error in Fetching Data");
                setErrorFlag(true);
            });
    }

    const handleGoback = ()=>{
        navigate('/');
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {!errorFlag ?
                <div className="container">
                    <div className="container-center download_container">
                        <div className="show-container show-container1">
                            <div className='heading heading_download'>
                                <img className="download-icon" src={download} />
                                <h2>Download Your File</h2>
                            </div>
                            <div className='file-box file-box1'>
                                <div className='filename_logo'><img src={doc_icon} className='file_logo' /></div>
                                <p className='filename_text'>{fileName}</p>
                                <p className='filesize_text'>{Math.floor(fileSize / 1024) + "." + fileSize % 1024 + " MB"}</p>
                            </div>
                        </div>
                        <div className='link_div'>
                            <a href={fileLink} className='download_btn'>
                                <img src={download_icon} className='file_logo_1' />
                                Download
                            </a>
                        </div>

                    </div>
                </div> :
                <div className="container">
                    <div className="container-center">
                        <div className='error_div'>
                            <h1>Oops! Looks like file doesn't exist</h1>
                            <img src={img_404} className='img_404' />
                            <div className='link_div'>
                                <div className='download_btn' onClick={handleGoback}>
                                    <img src={goback_icon} className='file_logo_1' />
                                    Go Back
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Download;