import { Button, TextField } from "@mui/material";
import React from "react";
import VirtualizedTable from "./VirtualizedTable";

const UserList: React.FC = () => {
  return (
    <div>
      <TextField label="Search" variant="outlined" fullWidth />
      <Button variant="contained" color="primary">
        Add User
      </Button>
      <VirtualizedTable />
    </div>
  );
};

export default UserList;
