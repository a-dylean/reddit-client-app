import React from "react"; 
import { Typography,   ListItemText } from "@mui/material";
const AccountsInfo = ({num, text}) => {
  return (
            <ListItemText sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h4">
                {num}
                <br />
              </Typography>
              <Typography variant="subtitle2">{text}</Typography>
            </ListItemText>
                  
  )
};

export default AccountsInfo;