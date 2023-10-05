import React from 'react';
import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';

import { MultiCarouselCSS, responsive } from './styles';

const StyledMultiCarousel = ({ children }) => {
  return (
    <MultiCarouselCSS>
      <Carousel responsive={responsive}>{children}</Carousel>
    </MultiCarouselCSS>
  );
};

export default StyledMultiCarousel;
