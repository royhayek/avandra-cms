// Packages
import PT from 'prop-types';
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

const Button = ({ color, variant, text, loading, onClick, ...props }: ButtonProps) => {
  // Statics
  const classes = useStyles();
  const isSmall = useIsSmall();

  // Renderers
  return (
    <MUIButton
      color={color}
      disableElevation
      variant={variant}
      onClick={onClick}
      disabled={loading}
      size={isSmall ? 'small' : 'large'}
      classes={{ root: classNames(classes.button, variant), containedSecondary: classes.containedSecondary }}
      {...props}>
      {loading ? <CircularProgress color="inherit" size={27} /> : text}
    </MUIButton>
  );
};

Button.propTypes = {
  text: PT.string,
  color: PT.string,
  variant: PT.string,
  loading: PT.bool,
  onClick: PT.func
};

Button.defaultProps = {
  text: 'Submit',
  color: 'primary',
  variant: 'contained',
  loading: false
};

export default Button;
