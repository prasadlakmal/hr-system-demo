import { Button, TextField } from '@mui/material';
import React, { ReactNode } from 'react';

const UserList: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <TextField label='Search' variant='outlined' fullWidth />
      <Button variant='contained' color='primary'>
        Add User
      </Button>
      {children}
    </div>
  );
};

export default UserList;
