// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React from "react";
import { Card, Typography } from "@mui/material";
//----------------------------------------------------//
//------------------- UTILITIES ----------------------//
//----------------------------------------------------//
import useStyles from "./styles";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const CustomTooltip = ({ active, payload, label }) => {
// --------------------------------------------------------- //
// ------------------------ Static ------------------------- //
  const classes = useStyles();
  //--------------------- STATICS ----------------------//
  //----------------------------------------------------//

  if (active && payload && payload.length) {
    return (
      <Card className={classes.container}>
        <Typography variant="caption" color="primary" className={classes.label}>
          {payload[0]?.value}
        </Typography>
        <Typography
          variant="caption"
          color="secondary"
          className={classes.desc}
        >
          {label.toString()}
        </Typography>
      </Card>
    );
  }

  return null;
};

export default CustomTooltip;
