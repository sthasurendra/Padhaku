import styled from 'styled-components';

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 6,
  },
  mediumDesktop: {
    breakpoint: { max: 2000, min: 1640 },
    items: 5,
  },
  miniDesktop: {
    breakpoint: { max: 1640, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export const MultiCarouselCSS = styled.div`
  display: block;
  // Overiding default package style
  .react-multi-carousel-list {
    padding-top: 2rem !important;
  }
  .react-multi-carousel-track {
    user-select: none;
  }
  .react-multi-carousel-item  {
    min-width: 300px;
  }
`;
