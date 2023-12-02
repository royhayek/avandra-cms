// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';
import { DeepPartial } from 'redux';
import getSchema from 'schemas';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import { Box, Grid, Typography } from '@mui/material';
import Button from 'shared/components/Buttons/Primary';
import BackBtn from 'shared/components/Buttons/Back';
import Card from 'shared/components/Card';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useFormStyles } from 'shared/assets/styles';
import useStyles from './styles';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const Form = () => {
  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const styles = useStyles();
  const formStyles = useFormStyles();
  const classes = { ...styles, ...formStyles };

  const form = useRef<BaseForm<
    DeepPartial<unknown>,
    BaseFormProps<DeepPartial<unknown>>,
    BaseFormState<DeepPartial<unknown>>
  > | null>(null);

  const [schema, setSchema] = useState<Bridge>();
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('addNotificationSchema', {}, {}, {}));
    } catch (err) {
      console.error('Error in [Notification Form - setSchemaDef] :: ', err);
    }
  }, []);

  const handleSubmit = useCallback((model) => {
    console.debug('[handleSubmit] :: ', { model });
  }, []);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // ----------------------- /Effects ------------------------ //
  // --------------------------------------------------------- //
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setSchemaDef();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  // ----------------------- /Effects ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  return (
    <>
      <Box className={classes.header}>
        <BackBtn />
        <Typography variant="h5">New Notification</Typography>
      </Box>

      <Card>
        {schema ? (
          <AutoForm ref={form} placeholder schema={schema} onSubmit={handleSubmit}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="title" />
                <ErrorField name="title" />
                <AutoField name="message" />
                <ErrorField name="message" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="image" />
                <ErrorField name="image" />
              </Grid>
            </Grid>

            <Box className={classes.footer}>
              <Button text="Submit" onClick={() => form.current?.submit()} />
            </Box>
          </AutoForm>
        ) : null}
      </Card>
    </>
  );
};

export default Form;
