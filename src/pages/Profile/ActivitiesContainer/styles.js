import styled from 'styled-components';

export const ActivitiesDiv = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.pageBackground};
  color: ${(props) => props.theme.primaryColor};
  border-radius: 15px;
  .headingDiv {
    font-size: 3rem;
    padding: 1rem;
    border-bottom: 1px solid gray;
  }
  .activitiesDiv {
    overflow: auto;
    height: 150vh;
  }
  .activityBar {
    padding: 1rem;
    margin: 1rem;
    border: 3px solid #d8d8d8;
    border-radius: 15px;
    .loadingUser {
      display: flex;
      align-items: center;
    }
    .userBox {
      display: flex;
      align-items: center;

      .userPicName {
        display: flex;
        align-items: center;
        margin-right: 0.5rem;
        div {
          margin-right: 0.5rem;
        }
      }
      .actionSpan,
      .action {
        margin-right: 0.5rem;
      }
    }
    .bookImgDiv {
      height: 400px;
      margin: 1rem;
      overflow-y: auto;
      img {
        height: 95%;
      }
    }
  }
`;
