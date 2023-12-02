// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import classNames from 'classnames';
import React, { ReactNode } from 'react';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { CircularProgress, Button as MUIButton, ButtonProps as MuiButtonProps } from '@mui/material';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useIsSmall } from 'shared/utils/index.ts';
import useStyles from './styles.ts';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
interface ButtonProps extends MuiButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  text?: ReactNode;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ variant = 'contained', text = 'Submit', loading, onClick, ...props }: ButtonProps) => {
  // --------------------------------------------------------- //
  // ------------------------ Statics ------------------------ //
  const classes = useStyles();
  const isSmall = useIsSmall();
  // ----------------------- /Statics ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  return (
    <MUIButton
      disableElevation
      variant={variant}
      onClick={onClick}
      disabled={loading}
      className={classNames(classes.button, variant)}
      size={isSmall ? 'small' : 'large'}
      {...props}>
      {loading ? <CircularProgress color="inherit" size={27} /> : text}
    </MUIButton>
  );
};

export default Button;
