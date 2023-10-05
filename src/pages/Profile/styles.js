import styled from 'styled-components';

export const ProfileCSS = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: ${(props) => props.theme.bg_secondaryColor};
  color: ${(props) => props.theme.primaryColor};
  flex-direction: column;
  &.container {
    width: 70%;
    margin: 0 auto;
  }
  .headerDiv {
    min-height: 75vh;
    background: #333;
    display: flex;
    flex-direction: column;

    .backgroundDiv {
      flex: 11;
    }
    .introDiv {
      flex: 1;
      background: ${(props) => props.theme.pageBackground};
      position: relative;
      .picContainer {
        position: absolute;
        margin: 0 auto;
        top: -62%;
        left: 50%;
        transform: translateX(-50%);
      }
      .btnContainer {
        position: absolute;
        top: -10%;
        right: 4%;
      }
      .name_h1 {
        margin-top: 5rem;
        text-align: center;
      }
      .infoContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .bioContainer {
          margin: 1rem 0;
        }
        .connectionContainer {
          margin-bottom: 1rem;
        }
      }
    }
  }
  .bodyDiv {
    border-top: #33333308 solid 3px;
    min-height: 100vh;
    display: flex;
    padding-top: 1rem;
    .infoDiv {
      width: 40%;
      padding: 1em 2em 1em 0;
    }
    .activityDiv {
      width: 60%;
    }
  }
`;
