// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import classNames from 'classnames';
import React, { MouseEvent, ReactNode } from 'react';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Card as MUICard, CardProps as MUICardProps, SxProps } from '@mui/material';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import useStyles from './styles.ts';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
interface CardProps extends MUICardProps {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  className?: string;
  sx?: SxProps;
}

const Card: React.FC<CardProps> = ({ children, onClick, className, sx }) => {
  // --------------------------------------------------------- //
  // ------------------------ Static ------------------------- //
  const classes = useStyles();
  // ----------------------- /Static ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  return (
    <MUICard elevation={0} className={classNames(classes.card, className)} onClick={onClick} sx={sx}>
      {children}
    </MUICard>
  );
};

export default Card;
