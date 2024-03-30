import React from 'react';
import { Button, ListGroup, Form, ListGroupItem } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'
import ImageDisplay from '../components/ImageDisplay';
import { Container, Row, Col } from 'react-bootstrap';
import placeholderGif from '../assets/gif.gif';

function ControlPanel ({ onImageUpload }) {
  const [selectedFile, setSelectedFile] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [title, setTitle]=useState('');
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast]=useState(0);
  const[sharpness,setSharpness]=useState(0);
  const [clarity, setClarity] = useState(0); 
  const [originalImageSrc, setOriginalImageSrc] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [threshold, setThreshold] = useState(0.5);
  const [classificationResult, setClassificationResult] = useState(null);
  const [isClassified, setIsClassified] = useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    
  };
  
  const formatText = (text) => {
  const withLineBreaks = text.replace(/\n/g, '<br/>');
  const withBold = withLineBreaks.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  return withBold;
};

const FormattedText = ({ text }) => {
  if (!text) return null;

  const formattedText = formatText(text);

  const createMarkup = (html) => {
    return { __html: html };
  };

  return <div dangerouslySetInnerHTML={createMarkup(formattedText)} />;
};



  const handleZoomChange = (event) => {
    setZoomLevel(parseFloat(event.target.value));
  };

  const handleThresholdChange = (event) => {
    setThreshold(parseFloat(event.target.value));
  };
  
    useEffect(() => {
  if (classificationResult) {
    console.log('Updated Classification Result:', classificationResult);
  if (classificationResult.result) {
      console.log('Classification:', classificationResult.result.classification);
    }
  }
}, [classificationResult]);
    

  const handleFileDisplay=()=>{
    if (selectedFile) {
      const localImageUrl = URL.createObjectURL(selectedFile);
      setOriginalImageSrc(localImageUrl);
      setImageSrc(localImageUrl);
      setTitle('Uploaded Image')
    }

  };

 const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        responseType: 'blob',
      });

      const localUrl = URL.createObjectURL(response.data);
      setTitle('Processed Image');
      setImageSrc(localUrl);

      const classifyResponse = await axios.post('http://localhost:8080/classify', formData);
      
      const formattedInsights = classifyResponse.data.insights ? formatText(classifyResponse.data.insights) : '';
      setClassificationResult({
      ...classifyResponse.data, insights: formattedInsights});
      setIsClassified(true);
      console.log(classifyResponse);
      console.log('Classification Response:', classifyResponse.data);
    } catch (error) {
      console.error(error.response);
      alert('There was an error processing your image.');
    }
  };

  useEffect(() => {
    if (classificationResult) {
      console.log('Classification Result State:', classificationResult);
      console.log("hello");
      console.log(classificationResult.classification);
      console.log(classificationResult.confidence);
      console.log(classificationResult.insights);
    }
  }, [classificationResult]);


const handleDownload = () => {
  if (!imageSrc) {
    alert("No image to download!");
    return;
  }

  const link = document.createElement('a');
  link.href = imageSrc; 
  link.setAttribute('download', 'segmented_image.png');

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleBrightnessChange = (event) => {
 const newBrightness = parseFloat(event.target.value);
  setBrightness(newBrightness);
};
const handleContrastChange = (event) => {
 const newContrast = parseFloat(event.target.value);
  setContrast(newContrast);
};
const handleSharpnessChange=(event)=>{
 const newSharpness=parseFloat(event.target.value);
  setSharpness(newSharpness);
}

const handleClarityChange = (event) => {
  const newClarity = parseFloat(event.target.value);
  setClarity(newClarity);
};


const adjustBrightness = (imageData, brightness) => {
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] += 255 * (brightness - 1);     // red
    data[i + 1] += 255 * (brightness - 1); // green
    data[i + 2] += 255 * (brightness - 1); // blue
  }
};
const adjustContrast = (imageData, contrast) => {
  const data = imageData.data;
  const factor = (350 * (contrast + 255)) / (255 * (259 - contrast));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = truncate(factor * (data[i] - 128) + 128);     // red
    data[i + 1] = truncate(factor * (data[i + 1] - 128) + 128); // green
    data[i + 2] = truncate(factor * (data[i + 2] - 128) + 128); // blue
  }

  function truncate(value) {
    return Math.max(0, Math.min(255, value));
  }
};
const adjustSharpness = (imageData, sharpness) => {
  const data = imageData.data;
  const width = imageData.width;
  const height = imageData.height;
  const kernel = [
    [0, -sharpness, 0],
    [-sharpness, 1 + 4 * sharpness, -sharpness],
    [0, -sharpness, 0]
  ];

  const sharpenedData = new Uint8ClampedArray(data.length);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const p = (y + ky) * width * 4 + (x + kx) * 4 + c;
            sum += kernel[ky + 1][kx + 1] * data[p];
          }
        }
        const p = (y * width + x) * 4 + c;
        sharpenedData[p] = sum;
      }
      sharpenedData[(y * width + x) * 4 + 3] = 255;
    }
  }

  for (let i = 0; i < data.length; i++) {
    data[i] = sharpenedData[i];
  }
};

function applyClarity(imageData, clarity) {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  const kernel = [
    [-clarity, -clarity, -clarity],
    [-clarity, 1 + 8 * clarity, -clarity],
    [-clarity, -clarity, -clarity]
  ];

  const clarityData = new Uint8ClampedArray(data.length);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      for (let c = 0; c < 3; c++) {
        let sum = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const p = (y + ky) * width * 4 + (x + kx) * 4 + c;
            sum += kernel[ky + 1][kx + 1] * data[p];
          }
        }
        const p = (y * width + x) * 4 + c;
        clarityData[p] = Math.min(255, Math.max(0, sum));
      }
      clarityData[(y * width + x) * 4 + 3] = 255;
    }
  }

  for (let i = 0; i < data.length; i++) {
    data[i] = clarityData[i];
  }
}

useEffect(() => {
  const img = new Image();
  img.src = originalImageSrc;

  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    adjustBrightness(imageData, brightness);
    adjustContrast(imageData, contrast);
    adjustSharpness(imageData, sharpness);
    applyClarity(imageData, clarity);


    ctx.putImageData(imageData, 0, 0);
    setImageSrc(canvas.toDataURL('image/png'));
  };
}, [brightness, contrast, sharpness,clarity, originalImageSrc]);

  return (
    <div className="control-panel-container" style={{ backgroundColor: '#121212' }}>
      <Container fluid>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
<Col md={4} className="d-flex" style={{ backgroundColor: 'black' }}>
  <ListGroup className="w-100" style={{ color: 'white' }}>
            
<ListGroup.Item style={{ backgroundColor: 'black', color: 'white', border: 'none' }}>
         <div>
         <input type="file" className='btn' onChange={handleFileChange} />
         </div>
       
      </ListGroup.Item>
      <ListGroup.Item style={{ backgroundColor: 'black', color: 'white', border: 'none' }}>
      <Button className='btn' variant="success" onClick={handleFileDisplay}>Upload Image</Button>

      </ListGroup.Item>
<ListGroup.Item style={{ backgroundColor: 'black', color: 'white', border: 'none' }}>
        <Button className='btn' variant="success" onClick={handleFileUpload}>Run Segmentation</Button>
      </ListGroup.Item>
<ListGroup.Item style={{ backgroundColor: 'black', color: 'white', border: 'none' }}>
        <Button className='btn' variant="info" onClick={handleDownload} >Export Results</Button>
      </ListGroup.Item>

<ListGroup.Item style={{ backgroundColor: 'black', color: 'white', border: 'none' }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: 'bold' }}>Brightness</Form.Label>
          <Form.Control type="range"
            min="0"
            max="2"
            step="0.005"
            value={brightness}
            onChange={handleBrightnessChange}
            style={{ background: 'grey', border: 'none' }} />
        </Form.Group>

          <Form.Group>
            <Form.Label>Contrast</Form.Label>
            <Form.Control type="range" 
            min="-20"
            max="20"
            step="5"
            value={contrast}
            onChange={handleContrastChange}
            style={{ border: 'none' }}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Sharpness</Form.Label>
            <Form.Control type="range"
            min="-50" 
            max="50" 
            step="10"
            value={sharpness}
            onChange={handleSharpnessChange}
            style={{ border: 'none' }}
             />
          </Form.Group>
          <Form.Group>
            <Form.Label>Clarity</Form.Label>
            <Form.Control type="range"
                min="-10"
                max="10"
                step="1"
                value={clarity}
                onChange={handleClarityChange}
                style={{ border: 'none' }}
             />
          </Form.Group>
        </Form>
      </ListGroup.Item>
<ListGroup.Item style={{ backgroundColor: 'black', color: 'white', border: 'none' }}>
        <Form>
            <Form.Label>Model Analysis</Form.Label>
        </Form>
      </ListGroup.Item>
        
<ListGroup.Item style={{ backgroundColor: 'black', color: 'white', border: 'none' }}>
                <Form>
                  <Form.Group>
                    <Form.Label>Zoom</Form.Label>
                    <Form.Control type="range" min="1" max="3" step="0.1" value={zoomLevel} onChange={handleZoomChange} style={{ border: 'none' }} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Segmentation Threshold</Form.Label>
                    <Form.Control type="range" min="0" max="1" step="0.01" value={threshold} onChange={handleThresholdChange} style={{ border: 'none' }} />
                  </Form.Group>

                </Form>
              </ListGroup.Item>
</ListGroup>
          </Col>
          
<Col md={6}>
  {
    imageSrc ?
    <ImageDisplay imageSrc={imageSrc} title={title} zoom={zoomLevel} /> :
    <img src={placeholderGif} alt="Placeholder" style={{
      width: '100%',
      height: '140%',
      objectFit: 'cover',
      borderRadius: '15px',
      filter: 'brightness(50%)' 
    }} />
  }
</Col>


<Col md={2} style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRadius: '5px', border: '3px solid rgb(166, 79, 3)' ,}}>
  {isClassified ? (
<ListGroup>
  <ListGroup.Item style={{ backgroundColor: '#121212', color: 'white' }}><strong>Classification Results</strong></ListGroup.Item>
  
  <ListGroup.Item style={{ backgroundColor: '#121212', color: 'white' }}>Classification: {classificationResult?.classification}</ListGroup.Item>
  
    <ListGroup.Item style={{ backgroundColor: '#121212', color: 'white' }}><strong>Insights</strong></ListGroup.Item>
    
    <ListGroup.Item style={{ backgroundColor: '#121212', color: 'white' }}>
         <FormattedText text={classificationResult?.insights} /></ListGroup.Item>
</ListGroup>

  ) : (
    <ListGroup>
      <ListGroup.Item style={{ backgroundColor: '#121212', color: 'white' }}><strong>Important Information</strong></ListGroup.Item>
      <ListGroup.Item style={{ backgroundColor: '#121212', color: 'white' }}>
        This platform leverages state-of-the-art AI to provide in-depth analysis of retinal images, aiding ophthalmologists in early detection and intervention.
      </ListGroup.Item>
      <ListGroup.Item style={{ backgroundColor: '#121212', color: 'white' }}>
        Recent advances in imaging technology now allow for even earlier detection of retinal diseases, potentially preserving vision.
      </ListGroup.Item>
      
            <ListGroup.Item style={{ backgroundColor: '#121212', color: 'white' }}><strong>Interesting Fact</strong></ListGroup.Item>
      <ListGroup.Item style={{ backgroundColor: '#121212', color: 'white' }}>
        Machine learning algorithms are becoming increasingly adept at predicting cardiovascular risk from retinal images.
      </ListGroup.Item>
      
            <ListGroup.Item style={{ backgroundColor: '#121212', color: 'white' }}><strong>Reminder</strong></ListGroup.Item>
      <ListGroup.Item style={{ backgroundColor: '#121212', color: 'white' }}>
         High-quality images yield more accurate diagnoses. Please ensure the uploaded images meet the guidelines.
      </ListGroup.Item>
    </ListGroup>
  )}
</Col>
          
        </Row>
      </Container>
    </div>
    
  );
};

export default ControlPanel;
