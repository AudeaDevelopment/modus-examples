import React from 'react';
import TextField from '@material-ui/core/TextField';

export default props => (
  <div>
    <TextField
      onChange={props.changeText}
      name="email"
      type="email"
      placeholder="Email Address"
    />

    <TextField
      onChange={props.changeText}
      name="password"
      type="password"
      placeholder="Password"
    />
  </div>
);
