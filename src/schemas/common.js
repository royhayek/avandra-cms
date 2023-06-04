import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import classNames from "classnames";
import ImageField from "components/Controls/ImageField";
import _ from "lodash";

const SchemaHelpers = {
  text: (classes = {}, schemaProps = {}, uniformsProps = {}) => ({
    type: String,
    label: false,
    ...schemaProps,
    uniforms: {
      type: "text",
      className: classNames(classes.formControl),
      variant: "outlined",
      ...uniformsProps,
    },
  }),
  bool: (classes = {}, schemaProps = {}, uniformsProps = {}) => ({
    type: Boolean,
    label: false,
    ...schemaProps,
    uniforms: {
      type: "bool",
      className: classNames(classes.formControl),
      ...uniformsProps,
    },
  }),
  select: (classes = {}, schemaProps = {}, uniformsProps = {}) => ({
    type: String,
    ...schemaProps,
    uniforms: {
      ...uniformsProps,
    },
  }),
  image: (classes = {}, schemaProps = {}, uniformsProps = {}) => ({
    type: Object,
    ...schemaProps,
    uniforms: {
      component: ImageField,
      ...uniformsProps,
    },
  }),
  password: (
    classes = {},
    schemaProps = {},
    { show = false, name = "password", toggle, ...uniformsProps } = {}
  ) => ({
    type: String,
    label: false,
    // regEx: SimpleSchema.RegEx.Password,
    ...schemaProps,
    uniforms: {
      type: show ? "text" : "password",
      fullWidth: true,
      className: classes.formControl,
      variant: "outlined",
      autoComplete: "current-password",
      InputProps: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => _.isFunction(toggle) && toggle(name)}
              tabIndex={-1}
              size="medium"
            >
              {show ? (
                <VisibilityOff color="primary" />
              ) : (
                <Visibility color="primary" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      },
      ...uniformsProps,
    },
  }),
};

export default SchemaHelpers;
