import styled from 'styled-components';

export const ProfilePicComponentCSS = styled.div`
  border-radius: 1000px;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 1rem;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 8rem;
  height: 8rem;

  &.bigPP {
    width: 12rem;
    height: 12rem;
  }

  .mainImage {
    position: absolute;
    object-fit: contain;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.pageBackground};
  }
  .editProfilePic_label {
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;

    :hover .overlay {
      opacity: 1;
    }
    .ImgInput {
      opacity: 0;
      position: absolute;
    }
    .overlay {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      width: 100%;
      height: 100%;
      border-radius: 10000px;
      backdrop-filter: blur(10px);
      transition: opacity 500ms;
    }
  }
`;

export const MiniProfilePicComponentCSS = styled.div`
  .initialsDiv {
    height: 2.5rem;
    width: 2.5rem;
    object-fit: contain;
    border-radius: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
