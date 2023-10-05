/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getInitials, HexadecimalConverter, getYourColor } from '../../_helpers/methods';
import { ProfilePicComponentCSS, MiniProfilePicComponentCSS } from './styles';
import { AiOutlineEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { fetchWrapper } from '../../_helpers';
import { putUserProfile } from '../../_redux/actions/ActionUser';

const ProfilePicComponent = ({ name = 'Padhaku', putUserProfile, image, className }) => {
  let { bg, color } = getYourColor(HexadecimalConverter(name));
  const [imageFile, setImageFile] = useState(image);

  useEffect(() => {
    setImageFile(image);
  }, [image]);

  const handlePicSelect = async (event) => {
    const maxFileSize = 20 * 1024 * 1024;
    const imageFile = event.target.files[0];
    if (imageFile && imageFile.size < maxFileSize) {
      let fileName = imageFile.name;
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
        try {
          let formData = new FormData();
          formData.append('avatar', imageFile);
          let response = await fetchWrapper.post(`users/me/upload`, formData, true);
          setImageFile(URL.createObjectURL(imageFile));
          putUserProfile({ imageUrl: response.imageUrl });
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      } else {
        toast.warn('Invalid Image Type!');
      }
    } else if (imageFile) {
      toast.warn('Image Must be less than 20 mb in size!');
    }
  };
  return (
    <ProfilePicComponentCSS
      className={className}
      css={css`
        background: ${bg};
        color: ${color};
      `}
    >
      {imageFile ? <img className="mainImage" src={imageFile} alt="book" /> : getInitials(name)}

      <label className="editProfilePic_label">
        <input className="ImgInput" type="file" onChange={handlePicSelect} accept="image/*" />
        <div className="overlay">
          <AiOutlineEdit />
        </div>
      </label>
    </ProfilePicComponentCSS>
  );
};

export const MiniProfilePicComponent = ({ name, avatar }) => {
  let { bg, color } = getYourColor(HexadecimalConverter(name));
  return (
    <MiniProfilePicComponentCSS>
      {avatar ? (
        <img className="initialsDiv" src={avatar} alt={name} />
      ) : (
        <div
          className="initialsDiv"
          css={css`
            background: ${bg};
            color: ${color};
          `}
        >
          {getInitials(name)}
        </div>
      )}
    </MiniProfilePicComponentCSS>
  );
};

export default connect(null, { putUserProfile })(ProfilePicComponent);
