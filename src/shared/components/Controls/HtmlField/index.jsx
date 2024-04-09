/* eslint-disable react/prop-types */
// Packages
import React from 'react';
import { connectField } from 'uniforms';

// Components
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box, InputLabel, useTheme } from '@mui/material';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Utilities
import useStyles from './styles';

// Component

const HtmlField = ({ label, onChange, value, required }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Box className={classes.container}>
      <InputLabel shrink required={required}>
        {label}
      </InputLabel>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </Box>
  );
};

export default connectField(HtmlField);
