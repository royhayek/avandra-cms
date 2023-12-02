// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { MouseEvent, ReactNode } from 'react';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, Typography } from '@mui/material';
import Card from 'shared/components/Card/index.tsx';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import useStyles from './styles.ts';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  padding?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, onClick, padding }) => {
  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const classes = useStyles();
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
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
