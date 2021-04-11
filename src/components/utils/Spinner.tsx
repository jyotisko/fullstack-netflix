import React from 'react';
import icons from './../../assets/icons.svg';

const Spinner: React.FC = () => {
  return (
    <div className='spinner'>
      <svg className='spinner__icon'>
        <use href={`${icons}#icon-loader`}></use>
      </svg>
    </div>
  );
}

export default Spinner;