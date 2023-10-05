/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { Fragment, useState } from 'react';
import { BsBook } from 'react-icons/bs';
function MultiImage({ register, getValues }) {
  const [bookImages, setBookImages] = useState(() => {
    const filesList = getValues('userbookImage');
    console.log(filesList, 'filesList');
    if (typeof filesList === 'object') {
      if (filesList.length) {
        return [...filesList];
      }
    }
    return [];
  });

  const handleImages = (e) => {
    console.log(e.target.files);
    if (e.target.files.length > 3) {
      alert('Only 3 files accepted.');
      e.target.files = null;
    } else {
      setBookImages([...e.target.files]);
    }
  };

  return (
    <div>
      <div>Your Book Image:</div>
      <div
        css={css`
          margin: 1rem 0;
        `}
      >
        <label>
          <input
            css={css`
              opacity: 0;
            `}
            type="file"
            name="userbookImage"
            {...register('userbookImage')}
            multiple
            onChange={handleImages}
          />
          {bookImages.length ? (
            <div>
              <div
                css={css`
                  display: flex;
                `}
              >
                {bookImages.map((imageFile, index) => {
                  if (index < 3) {
                    return (
                      <img
                        key={index}
                        css={css`
                          width: 300px;
                          height: 300px;
                          margin: 0 0.5rem;
                          object-fit: contain;
                        `}
                        src={URL.createObjectURL(imageFile)}
                      />
                    );
                  }
                })}
              </div>
            </div>
          ) : (
            <Fragment>
              <div>Add photo of your book. you must add atleast 1 image and atmost 3 images.</div>

              <div
                className="overlay"
                css={css`
                  width: 300px;
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  padding: 1rem;
                  border: 5px dashed;
                  border-radius: 18px;
                  cursor: pointer;
                  transition: transform 300ms;
                  :hover {
                    transform: scale(1.1);
                  }
                `}
              >
                <span>
                  <BsBook /> Click to add your Book Image
                </span>
              </div>
            </Fragment>
          )}
        </label>
      </div>
    </div>
  );
}

export default MultiImage;
