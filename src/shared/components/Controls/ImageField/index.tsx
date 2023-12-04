// Packages
import _ from 'lodash';
import classNames from 'classnames';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { FieldProps, connectField } from 'uniforms';

// Components
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, IconButton, Input, InputLabel, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { extractBlobUrl } from 'shared/utils';
import { useCommonStyles } from 'shared/assets/styles';

// Component
interface ImageFieldProps {
  label?: string;
  onChange: (file: File | void) => void;
  value?: File | null;
  error?: string;
  required?: boolean;
}

// Create a union type that includes FieldProps and your custom props
type CombinedProps = FieldProps<string, ImageFieldProps>;

const ImageField = ({ label, onChange, value, error, required }: CombinedProps) => {
  // Statics
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...commonStyles, ...styles };

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Renderers Vars
  useEffect(() => {
    const fetchUrl = async () => {
      if (value && typeof value === 'string' && value.includes('blob')) {
        const blob = await extractBlobUrl(value);
        setImageUrl(URL.createObjectURL(blob));
      } else if (value && typeof value === 'string') {
        // Adjust this part based on your implementation
        setImageUrl(null);
      } else {
        setImageUrl(null);
      }
    };

    fetchUrl();
  }, [value]);

  const hasError = useMemo(() => !_.isEmpty(error), [error]);

  // Renderers
  return (
    <Box>
      <InputLabel htmlFor="file-input" error={hasError}>
        <Box className={classNames(classes.container, { error: hasError })}>
          <Typography variant="caption" color={`${hasError ? 'text.error' : 'text.secondary'}`}>
            Click to choose an image
          </Typography>
          <Typography variant="caption" className={classes.label}>
            {label} {required ? '*' : ''}
          </Typography>
        </Box>
      </InputLabel>
      {imageUrl !== null ? (
        <Box className={classNames(classes.imageContainer)}>
          <Box className={classNames(classes.row, 'center')} sx={{ gap: 2 }}>
            <img alt="" className={classes.previewImage} src={imageUrl} />
            <Typography variant="caption">{typeof value === 'string' ? '' : value}</Typography>
          </Box>
          <IconButton size="small" onClick={() => null}>
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : null}
      <Input
        type="file"
        id="file-input"
        className={styles.fileInput}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;

          if (files && files.length > 0) {
            onChange('');
          }
        }}
      />
    </Box>
  );
};

export default connectField(ImageField);
