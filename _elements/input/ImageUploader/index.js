/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState } from 'react';
import { ContainerDiv } from './styles';
import PlusSign from './plus-sign-button.svg';
import NoImg from './noImg.svg';
import { StyledButtonPrimary } from '../../button/Button';

const ImageUploader = ({ register, getValues, imgName }) => {
  const [imgSrc, setImgSrc] = useState(() => {
    const file = getValues(imgName);
    if (typeof file === 'object') {
      if (file.length) {
        let url;
        try {
          url = URL.createObjectURL(file[0]);
        } catch (err) {
          url = null;
        }
        return url;
      }
    } else if (typeof file === 'string') {
      return file;
    }
    return null;
  });

  const handlePicSelect = (event) => {
    console.log(event, 'event');
    if (event.target.files.length) {
      let fileName = event.target.files[0].name;
      let extention = fileName.split('.')[fileName.split('.').length - 1];
      let isImage;
      switch (extention.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
          isImage = true;
          break;
        default:
          isImage = false;
          break;
      }

      if (isImage) {
        setImgSrc(URL.createObjectURL(event.target.files[0]));
      } else {
        alert('Invalid Image Type! Valid Types: JPG, JPEG, PNG, and GIF');
      }
    }
  };
  const inputFileRegister = register(imgName);
  const { onChange } = inputFileRegister;

  return (
    <ContainerDiv>
      <div className="imageOverlayContainer">
        <label>
          <input
            name={imgName}
            className="ImgInput"
            type="file"
            accept="image/*"
            {...inputFileRegister}
            onChange={(e) => {
              handlePicSelect(e);
              onChange(e);
            }}
          />
          <div className="overlay"></div>
          <img className="plus" src={PlusSign} alt="plus" />
          <img className="mainImage" src={imgSrc || NoImg} alt="book" />
        </label>
      </div>
    </ContainerDiv>
  );
};

export default ImageUploader;
