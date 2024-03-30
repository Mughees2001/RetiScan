import React from 'react';
import { Card } from 'react-bootstrap';

function  ImageDisplay({ imageSrc , title })  {
  return (
    <div>
      <Card>
        <Card.Img variant="top" src={imageSrc} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Card>  

      </div>
  );
};


export default ImageDisplay;
