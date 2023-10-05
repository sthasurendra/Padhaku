import React, { useState } from 'react';
import { SignUpStep3CSS } from './styles';
import { CategoryBtn } from '../../../../_elements/button/Button';
import { HiddenInput } from '../../../../_elements/input/Input';

import { Categories, CategoryForSelect } from '../../../../_data/data';
import { SignUpGenreContainer } from './styles';

const SignUpStep3 = ({ register, getValues, setValue }) => {
  const [interest, setInterest] = useState([]);

  const handleCatClick = (category) => {
    let interestArr = [...interest];
    let optionCategory = CategoryForSelect.filter((cat) => cat.label === category);
    if (interestArr.includes(optionCategory[0].value)) {
      interestArr.splice(interestArr.indexOf(optionCategory[0].value), 1);
    } else {
      interestArr.push(optionCategory[0].value);
    }
    setInterest(interestArr);
    setValue('interest', JSON.stringify(interestArr));
  };

  return (
    <SignUpStep3CSS>
      <div className="welcomInfo">
        <h1 className="heading">Lastly! Tell us what you like</h1>
        <SignUpGenreContainer>
          {Categories.map((category) => {
            return (
              <span key={category}>
                <CategoryBtn category={category} handleClick={handleCatClick} />
              </span>
            );
          })}
          <HiddenInput type="text" {...register('interest')} />
        </SignUpGenreContainer>
      </div>
    </SignUpStep3CSS>
  );
};

export default SignUpStep3;
