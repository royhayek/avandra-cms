// Packages
import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';

// Components
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ImageField from 'shared/components/Controls/ImageField';
import HtmlField from 'shared/components/Controls/HtmlField';

// Helpers

const SchemaHelpers = {
  text: (classes = {}, schemaProps, uniformsProps) => ({
    type: String,
    label: false,
    ...schemaProps,
    uniforms: {
      type: 'text',
      className: classNames(classes.formControl),
      variant: 'filled',
      InputProps: { ...uniformsProps.InputProps, disableUnderline: true },
      ...uniformsProps
    }
  }),
  bool: (classes = {}, schemaProps = {}, uniformsProps = {}) => ({
    type: Boolean,
    label: false,
    ...schemaProps,
    uniforms: {
      type: 'bool',
      className: classNames(classes.formControl),
      ...uniformsProps
    }
  }),
  select: (_, schemaProps = {}, uniformsProps = {}) => ({
    type: String,
    ...schemaProps,
    uniforms: {
      variant: 'filled',
      disableUnderline: true,
      ...uniformsProps
    }
  }),
  image: (_, schemaProps = {}, uniformsProps = {}) => ({
    type: Object | String,
    ...schemaProps,
    uniforms: {
      component: ImageField,
      ...uniformsProps
    }
  }),
  html: (classes = {}, schemaProps, uniformsProps) => ({
    type: String,
    ...schemaProps,
    uniforms: {
      component: HtmlField,
      className: classNames(classes.formControl),
      ...uniformsProps
    }
  }),
  password: (classes = {}, schemaProps = {}, { show = false, name = 'password', toggle, ...uniformsProps } = {}) => ({
    type: String,
    label: false,
    // regEx: SimpleSchema.RegEx.Password,
    ...schemaProps,
    uniforms: {
      type: show ? 'text' : 'password',
      fullWidth: true,
      variant: 'filled',
      className: classes.formControl,
      autoComplete: 'current-password',
      InputProps: {
        ...uniformsProps.InputProps,
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="medium"
              tabIndex={-1}
              aria-label="Toggle password visibility"
              onClick={() => _.isFunction(toggle) && toggle(name)}>
              {show ? <VisibilityOff color="primary" /> : <Visibility color="primary" />}
            </IconButton>
          </InputAdornment>
        )
      },
      ...uniformsProps
    }
  })
};

export default SchemaHelpers;
