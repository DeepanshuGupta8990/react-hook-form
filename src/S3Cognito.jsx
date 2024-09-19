// src/components/ImageUpload.js
import React, { useState } from 'react';
// import { s3 } from './awsConfig';

const S3Cognito = () => {
  // const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleUpload = async () => {
  //   if (!file) return;

  //   const params = {
  //     Bucket: 'YOUR_S3_BUCKET_NAME',
  //     Key: file.name,
  //     Body: file,
  //     ContentType: file.type,
  //   };

  //   try {
  //     const result = await s3.upload(params).promise();
  //     console.log('Upload successful', result);
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // };

  // return (
  //   <div>
  //     <input type="file" onChange={handleFileChange} />
  //     <button onClick={handleUpload}>Upload</button>
  //   </div>
  // );
};

export default S3Cognito;
