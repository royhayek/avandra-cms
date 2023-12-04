// Packages
import getSchema from 'schemas';
import { DeepPartial } from 'redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';

// Components
import Card from 'shared/components/Card';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Button from 'shared/components/Buttons/Primary';
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import { Box, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import * as api from 'redux/category/api';
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';

// Component

const Form = () => {
  // Statics
  const history = useHistory();
  const styles = useStyles();
  const formStyles = useFormStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...commonStyles, ...formStyles, ...styles };

  const form = useRef<BaseForm<
    DeepPartial<unknown>,
    BaseFormProps<DeepPartial<unknown>>,
    BaseFormState<DeepPartial<unknown>>
  > | null>(null);

  const [schema, setSchema] = useState<Bridge>();
  const [loading, setLoading] = useState<boolean>(false);

  // Callbacks
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('addCategorySchema', {}, {}, {}));
    } catch (err) {
      console.error('Error in [User Form - setSchemaDef] :: ', err);
    }
  }, []);

  const handleSubmit = useCallback((model) => {
    console.debug('[handleSubmit] :: ', { model });

    setLoading(true);

    api
      .createCategory(model)
      .then(() => toast.success('Category created successfully'))
      .finally(() => setLoading(false));
  }, []);

  // Effects
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setSchemaDef();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">New Category</Typography>
      </Box>

      <Card>
        {schema ? (
          <AutoForm ref={form} schema={schema} onSubmit={handleSubmit} placeholder>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="name" />
                <ErrorField name="name" />
                <AutoField name="description" />
                <ErrorField name="description" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="image" />
                <ErrorField name="image" />
                <AutoField name="status" />
                <ErrorField name="status" />
              </Grid>
            </Grid>
            <Box className={classes.footer}>
              <Button text="Submit" onClick={() => form.current?.submit()} disabled={loading} />
            </Box>
          </AutoForm>
        ) : null}
      </Card>
    </>
  );
};

export default Form;
