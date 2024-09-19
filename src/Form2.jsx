import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

export default function Form2() {
  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm({
    defaultValues: {
      category: "image",
    }
  });

  const videoFileTrack = watch('videoFile');
  const profileImageTrack = watch('profileImage');
  const thumbnailTrack = watch('thumbnail');
  const categoryTracker = watch("category");

  const [fileError, setFileError] = useState('');
  const [profileError, setProfileError] = useState('');
  const [thumbnailError, setThumbnailError] = useState('');

  const defaultVideoUrl = 'https://learning-s3-bucket-deep.s3.amazonaws.com/video_avaa.mp4';
  const defaultProfileImageUrl = 'https://learning-s3-bucket-deep.s3.amazonaws.com/IMG-20240908-WA0010.jpg-1725820786522';

  useEffect(() => {
    setValue('videoFile', defaultVideoUrl);
    setValue('profileImage', defaultProfileImageUrl);
  }, [setValue,categoryTracker]);

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    accept: { "video/mp4": [".mp4"] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length) {
        setValue('videoFile', acceptedFiles[0]);
        trigger('videoFile');
        setFileError('');
      }
    },
    onDropRejected: () => setFileError('Only MP4 video files are accepted.'),
  });

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length) {
        setValue('profileImage', acceptedFiles[0]);
        trigger('profileImage');
        setProfileError('');
      }
    },
    onDropRejected: () => setProfileError('Only JPEG or PNG images are accepted.'),
  });

  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length) {
        setValue('thumbnail', acceptedFiles[0]);
        trigger('thumbnail');
        setThumbnailError('');
      }
    },
    onDropRejected: () => setThumbnailError('Only JPEG or PNG images are accepted.'),
  });

  const removeVideo = () => setValue('videoFile', null);
  const removeProfileImage = () => setValue('profileImage', null);
  const removeThumbnail = () => setValue('thumbnail', null);

  const onSubmit = (data) => {
    if(categoryTracker==='image'){
        delete data.videoFile;
        delete data.profileImage;
        console.log('Form Data:', data);   
    }else{
        delete data.thumbnail
        console.log('Form Data:', data);   
    }
  };
// console.log(videoFileTrack,'videoFileTrack')
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            {...register('category', { required: 'Category is required' })}
          >
            <option value="" disabled>Select a category</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
          {errors.category && <p style={{ color: 'red', marginTop: '5px' }}>{errors.category.message}</p>}
        </div>

       {
        categoryTracker==='video' ? (
            <>
             {/* Video Upload */}
        <div style={{ position: 'relative' }}>
          <div {...getVideoRootProps({ className: 'dropzone' })} style={dropzoneStyle}>
            <input {...getVideoInputProps()} />
            {videoFileTrack ? (
              <p>Uploaded video: {typeof videoFileTrack === 'string' ? 'Default Video' : videoFileTrack.name}</p>
            ) : (
              <p>Drag and drop a video here, or click to select one</p>
            )}
          </div>
          {videoFileTrack && (
            <video controls style={videoPlayerStyle} src={typeof videoFileTrack === 'string' ? videoFileTrack : URL.createObjectURL(videoFileTrack)}>
              Your browser does not support the video tag.
            </video>
          )}
          {videoFileTrack && (
            <button type="button" onClick={removeVideo} style={removeButtonStyle}>❌</button>
          )}
        </div>
        {fileError && <p style={{ color: 'red', marginTop: '5px' }}>{fileError}</p>}
        <input type="hidden" {...register('videoFile', { required: 'Video file is required' })} />
        {errors.videoFile && <p style={{ color: 'red', marginTop: '5px' }}>{errors.videoFile.message}</p>}

        {/* Profile Image Upload */}
        <div style={{ position: 'relative' }}>
          <div {...getImageRootProps({ className: 'dropzone' })} style={dropzoneStyle}>
            <input {...getImageInputProps()} />
            {profileImageTrack ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={typeof profileImageTrack === 'string' ? profileImageTrack : URL.createObjectURL(profileImageTrack)}
                  alt="Profile Preview"
                  style={imagePreviewStyle}
                />
                <p>{typeof profileImageTrack === 'string' ? 'Default Profile Image' : profileImageTrack.name}</p>
              </div>
            ) : (
              <p>Drag and drop a profile image here, or click to select one</p>
            )}
          </div>
          {profileImageTrack && (
            <button type="button" onClick={removeProfileImage} style={removeButtonStyle}>❌</button>
          )}
        </div>
        {profileError && <p style={{ color: 'red', marginTop: '5px' }}>{profileError}</p>}
        <input type="hidden" {...register('profileImage', { required: 'Profile image is required' })} />
        {errors.profileImage && <p style={{ color: 'red', marginTop: '5px' }}>{errors.profileImage.message}</p>}
            </>
        ) : (
            categoryTracker==='image' && 
            <>
            {/* Thumbnail Image Upload */}
        <div style={{ position: 'relative' }}>
          <div {...getThumbnailRootProps({ className: 'dropzone' })} style={dropzoneStyle}>
            <input {...getThumbnailInputProps()} />
            {thumbnailTrack ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={typeof thumbnailTrack === 'string' ? thumbnailTrack : URL.createObjectURL(thumbnailTrack)}
                  alt="Thumbnail Preview"
                  style={imagePreviewStyle}
                />
                <p>{typeof thumbnailTrack === 'string' ? 'Default Thumbnail' : thumbnailTrack.name}</p>
              </div>
            ) : (
              <p>Drag and drop a thumbnail image here, or click to select one</p>
            )}
          </div>
          {thumbnailTrack && (
            <button type="button" onClick={removeThumbnail} style={removeButtonStyle}>❌</button>
          )}
        </div>
        {thumbnailError && <p style={{ color: 'red', marginTop: '5px' }}>{thumbnailError}</p>}
        <input type="hidden" {...register('thumbnail', { required: 'Thumbnail image is required' })} />
        {errors.thumbnail && <p style={{ color: 'red', marginTop: '5px' }}>{errors.thumbnail.message}</p>}
            </>
        )
       }


        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// Inline styles
const dropzoneStyle = {
  border: '2px dashed #cccccc',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: '20px',
};

const imagePreviewStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  objectFit: 'cover',
};

const videoPlayerStyle = {
  width: '100%',
  maxHeight: "120px",
  marginTop: '20px',
};

const removeButtonStyle = {
  backgroundColor: '#e9e0e0',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  position: 'absolute',
  width: "20px",
  top: '0px',
  right: '-20px',
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
