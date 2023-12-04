// Packages
import classNames from 'classnames';
import React, { ReactNode } from 'react';

// Components
import { CircularProgress, Button as MUIButton, ButtonProps as MuiButtonProps } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useIsSmall } from 'shared/utils';

// Component
interface ButtonProps extends MuiButtonProps {
  text?: ReactNode;
  loading?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ variant = 'contained', text = 'Submit', loading, onClick, ...props }: ButtonProps) => {
  // Statics
  const classes = useStyles();
  const isSmall = useIsSmall();

  // Renderers
  return (
    <MUIButton
      disableElevation
      variant={variant}
      onClick={onClick}
      disabled={loading}
      size={isSmall ? 'small' : 'large'}
      className={classNames(classes.button, variant)}
      {...props}>
      {loading ? <CircularProgress color="inherit" size={27} /> : text}
    </MUIButton>
  );
};

export default Button;
