// Packages
import React from 'react';

// Components
import { Card, Typography } from '@mui/material';

// Utilities
import useStyles from './styles.ts';

// Component
interface CustomTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ value: string }>;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  // Statics
  const classes = useStyles();

 // Renderers
  if (active && payload && payload.length) {
    return (
      <Card className={classes.container}>
        <Typography variant="caption" color="primary" className={classes.label}>
          {payload[0]?.value}
        </Typography>
        <Typography variant="caption" color="secondary" className={classes.desc}>
          {label.toString()}
        </Typography>
      </Card>
    );
  }

  return null;
};

export default CustomTooltip;
