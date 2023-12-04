// Packages
import classNames from 'classnames';
import React, { MouseEvent, ReactNode } from 'react';

// Components
import { Card as MUICard, CardProps as MUICardProps, SxProps } from '@mui/material';

// Utilities
import useStyles from './styles';

// Component
interface CardProps extends MUICardProps {
  sx?: SxProps;
  className?: string;
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({ children, onClick, className, sx }) => {
  // Statics
  const classes = useStyles();

  // Renderers
  return (
    <MUICard className={classNames(classes.card, className)} elevation={0} onClick={onClick} sx={sx}>
      {children}
    </MUICard>
  );
};

export default Card;
