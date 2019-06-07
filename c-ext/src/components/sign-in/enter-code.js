import React from 'react';
import TextField from '@material-ui/core/TextField';

export default props => (
  <div>
    <div>Or, enter the code from the email you received below</div>
    <TextField
      onChange={props.onChange}
      name="confirmationCode"
      type="confirmationCode"
      placeholder="Enter Code"
    />
  </div>
);
