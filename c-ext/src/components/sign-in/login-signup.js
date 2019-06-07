import React from 'react';
import TextField from '@material-ui/core/TextField';

export default (props) => {
  const { changeText, display } = props;

  return (
    <div>
      <TextField
        onChange={changeText}
        name={display === 0 ? 'userName' : 'email'}
        type="text"
        placeholder={display === 0 ? 'User Name' : 'Email'}
      />

      <TextField
        onChange={changeText}
        name="password"
        type="password"
        placeholder="Password"
      />

      {display === 1 ? (
        <TextField
          onChange={changeText}
          name="userName"
          type="userName"
          placeholder="User Name"
        />
      ) : null}
    </div>
  );
};
