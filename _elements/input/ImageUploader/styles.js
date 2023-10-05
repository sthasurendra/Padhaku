import styled from 'styled-components';

export const ContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  .imageOverlayContainer {
    height: 86%;
    margin: 2% 0;
    width: 90%;
    background: #cccccc;
    border-radius: 5px;
    overflow: hidden;
    label {
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;
      cursor: pointer;
      .ImgInput {
        display: none;
      }
      .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        cursor: pointer;
        transition: background-color 250ms;
      }
      :hover .overlay {
        background-color: rgba(0, 0, 0, 0.5);
      }
      .plus {
        display: none;
        position: absolute;
        width: 30%;
      }
      :hover .plus {
        display: block;
      }
      .mainImage {
        height: 100%;
        max-height: 435px;
        object-fit: contain;
      }
    }
  }
  .buttonContainer {
    width: 90%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
