import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Spinner, ListGroup, ListGroupItem } from 'react-bootstrap'; 
import ImageDisplay from '../components/ImageDisplay';
function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const messageIndex = useRef(0); 

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImagePreviewUrl(URL.createObjectURL(e.target.files[0]));
    setResponseMessage('');
    setIsLoading(false);
  };

  useEffect(() => {
    let intervalId;
    if (isLoading) {
      setLoadingMessage(loadingMessages[messageIndex.current]); 
      intervalId = setInterval(() => {
        messageIndex.current = (messageIndex.current + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[messageIndex.current]);
      }, 5000);
    } else {
      messageIndex.current = 0;
    }

    return () => clearInterval(intervalId);
  }, [isLoading]);

  const loadingMessages = [
    "Analyzing image...",
    "Checking for optic clarity...",
    "Detecting pigmentation...",
    "Making predictions...",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/abnormal', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const formattedMessage = response.data.choices[0].message.content
        .replace(/\n/g, '<br />')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      setResponseMessage(formattedMessage);
    } catch (error) {
      console.error('Error uploading image:', error);
      setResponseMessage(`Error uploading image: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const createMarkup = (html) => {
    return { __html: html };
  };

  const blurClass = isLoading ? 'blur' : '';

  return (
    <div style={{ backgroundColor: 'black', paddingTop: '60px', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isLoading && (
        <div className="loading-overlay">
          <Spinner animation="border" role="status" style={{  justifyContent: 'center', color: 'white', width: '100px', height: '100px', marginBottom: '20px' }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>{loadingMessage}</p>
        </div>
      )}
      <div className={blurClass} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '5px', color: 'white' }}>
          <h2>Upload a Retinal Image for Analysis</h2>
          <p>Please upload your image and click "Upload Image" to see the results.</p>
          
            <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginLeft: responseMessage ? '5px' : '20px' }}>
  <input type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleImageChange} />
  <button type="submit" style={{ margin: responseMessage ? '10px' : '20px', padding: responseMessage ? '5px 10px' : '10px 20px' }}>Upload Image</button>
</form>
        </div>
       

{imagePreviewUrl && !responseMessage && (
  <div style={{ display: 'flex', justifyContent: 'center', width: '50%', marginTop: '0px', color: 'white' }}>
    <ImageDisplay imageSrc={imagePreviewUrl} title='Uploaded Image' style={{ maxWidth: '45%', maxHeight: '80vh' }} />
  </div>
)}

  
{imagePreviewUrl && !isLoading && responseMessage && (
  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' , color: 'white'}}>
  
  <ImageDisplay imageSrc={imagePreviewUrl} title= 'Uploaded Image' style={{ maxWidth: '45%', maxHeight: '80vh' }} />
<div
  style={{
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '10px',
    maxWidth: '45%',
    maxHeight: '100vh',
    overflow: 'auto',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', 
    padding: '20px', 
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
  }}
  dangerouslySetInnerHTML={createMarkup(responseMessage)}
></div>

  </div>
)}

      </div>
    </div>
  );
}

export default ImageUpload;

