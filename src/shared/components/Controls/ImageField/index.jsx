/* eslint-disable react/prop-types */
// Packages
import _ from 'lodash';
import classNames from 'classnames';
import { connectField } from 'uniforms';
import React, { useCallback, useMemo, useRef } from 'react';

// Components
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, FormControl, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { useCommonStyles } from 'shared/assets/styles';

// Component

const ImageField = ({
  name,
  label,
  onChange,
  value,
  error,
  size,
  path,
  accept,
  multiple,
  required,
  disabled,
  fullWidth,
  margin,
  controlClassName
}) => {
  // Statics
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...commonStyles, ...styles };

  const inputRef = useRef(null);

  const hasError = useMemo(() => !_.isEmpty(error), [error]);

  // Callbacks
  const onUploadClick = useCallback((e) => (e.target.value = null), []);

  const triggerFileUpload = useCallback(() => inputRef.current.click(), []);

  const handleDeleteImage = useCallback((index) => onChange(value.filter((_, i) => i !== index)), [onChange, value]);

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      // Convert files from FileList to Array if multiple files are supported
      onChange(multiple ? Array.from(files) : files[0]);
    }
  };

  // Renderers
  const renderImage = (file, index) =>
    file ? (
      <Box key={index} className={classNames(classes.imageContainer)}>
        <Box className={classNames(classes.row, 'center')} sx={{ gap: 2 }}>
          <img
            alt=""
            className={_.isEqual(size, 'small') ? classes.smallPreviewImage : classes.previewImage}
            src={
              file
                ? _.isString(file)
                  ? `${process.env.REACT_APP_PUBLIC_URL}/uploads/${path}/${file}`
                  : URL.createObjectURL(file)
                : null
            }
          />
          <Typography variant="caption">{_.isString(file) ? file : file?.name}</Typography>
        </Box>
        <IconButton size="small" onClick={() => handleDeleteImage(index)}>
          <DeleteForeverIcon fontSize="small" />
        </IconButton>
      </Box>
    ) : null;

  return (
    <FormControl
      error={!!error}
      margin={margin}
      required={required}
      disabled={!!disabled}
      fullWidth={!!fullWidth}
      className={classNames(classes.formControl, controlClassName)}>
      <label id="file-input-label" htmlFor="file-input" onClick={(e) => e.preventDefault()}>
        <Box onClick={triggerFileUpload} className={classNames(classes.container, { error: hasError })}>
          <Typography variant="caption" color={`${hasError ? 'text.error' : 'text.secondary'}`}>
            Click to choose {multiple ? 'images' : 'an image'}
          </Typography>
          <Typography variant="caption" className={classes.label}>
            {label} {required ? '*' : ''}
          </Typography>
        </Box>
      </label>

      {!_.isEmpty(value)
        ? Array.isArray(value) && value.length > 0
          ? value.map((file, index) => renderImage(file, index))
          : renderImage(value, 1)
        : null}
      <input
        name={name}
        type="file"
        id="file-input"
        ref={inputRef}
        accept={accept}
        multiple={multiple}
        onClick={onUploadClick}
        onChange={handleFileChange}
        className={styles.fileInput}
      />
    </FormControl>
  );
};

ImageField.defaultProps = {
  path: '',
  size: 'medium',
  multiple: false,
  required: false,
  accept: 'image/*'
};

export default connectField(ImageField);
