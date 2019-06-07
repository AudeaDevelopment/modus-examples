import React from 'react';
import ReactLoading from 'react-loading';

export const Loader = props => (
  <ReactLoading
    className={props.className}
    type={props.type}
    color={props.color}
    width={375}
  />
);
