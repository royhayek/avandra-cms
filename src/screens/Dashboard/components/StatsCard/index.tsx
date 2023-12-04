// Packages
import React, { MouseEvent, ReactNode } from 'react';

// Components
import Card from 'shared/components/Card';
import { Box, Typography } from '@mui/material';

// Utilities
import useStyles from './styles.ts';

// Interfaces
interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  padding?: string;
}

// Component

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, onClick, padding }) => {
  // Statics
  const classes = useStyles();

  // Renderers
  return (
    <Card onClick={onClick}>
      <Box className={classes.container} style={{ padding }}>
        <Box>
          <Typography variant="subtitle2" color="secondary">
            {title.toUpperCase()}
          </Typography>
          <Typography>{value}</Typography>
        </Box>
        <Box className={classes.iconContainer}>{icon}</Box>
      </Box>
    </Card>
  );
};

export default StatsCard;
