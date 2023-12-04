// Packages
import getSchema from 'schemas';
import { DeepPartial } from 'redux';
import { toast } from 'react-toastify';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';

// Components
import Card from 'shared/components/Card';
import { Box, Grid, Typography } from '@mui/material';
import Button from 'shared/components/Buttons/Primary';
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';

// Utilities
import useStyles from './styles';
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';

// Component

const General = () => {
  // Statics
  const styles = useStyles();
  const formStyles = useFormStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...formStyles, ...commonStyles };

  const form = useRef<BaseForm<
    DeepPartial<unknown>,
    BaseFormProps<DeepPartial<unknown>>,
    BaseFormState<DeepPartial<unknown>>
  > | null>(null);

  const [schema, setSchema] = useState<Bridge>();

  // Callbacks
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('generalSettingsSchema', {}, {}, {}));
    } catch (err) {
      console.error('Error in [User Form - setSchemaDef] :: ', err);
    }
  }, []);

  const handleSubmit = useCallback((model) => {
    console.debug('[handleSubmit] :: ', { model });
    toast.success('Category added successfully');
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setSchemaDef();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">Settings</Typography>
      </Box>

      <Card>
        {schema ? (
          <AutoForm ref={form} placeholder schema={schema} onSubmit={handleSubmit}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              General Settings
            </Typography>

            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="siteName" />
                <ErrorField name="siteName" />

                <AutoField name="emailAddress" />
                <ErrorField name="emailAddress" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="siteTitle" />
                <ErrorField name="siteTitle" />

                <AutoField name="seoKeywords" />
                <ErrorField name="seoKeywords" />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <AutoField name="siteDescription" />
                <ErrorField name="siteDescription" />
              </Grid>
            </Grid>

            <Typography variant="body1" sx={{ mt: 5, mb: 2 }}>
              SMTP Settings
            </Typography>

            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="smtpUsername" />
                <ErrorField name="smtpUsername" />

                <AutoField name="smtpPassword" />
                <ErrorField name="smtpPassword" />

                <AutoField name="smtpServer" />
                <ErrorField name="smtpServer" />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="smtpHost" />
                <ErrorField name="smtpHost" />

                <AutoField name="smtpEncryption" />
                <ErrorField name="smtpEncryption" />

                <AutoField name="smtpPort" />
                <ErrorField name="smtpPort" />
              </Grid>
            </Grid>

            <Typography variant="body1" sx={{ mt: 5, mb: 2 }}>
              oAuth Login Settings
            </Typography>

            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <AutoField name="fbApiId" />
                <ErrorField name="fbApiId" />

                <AutoField name="googleApiId" />
                <ErrorField name="googleApiId" />

                <AutoField name="appleApiId" />
                <ErrorField name="appleApiId" />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <AutoField name="fbApiKey" />
                <ErrorField name="fbApiKey" />

                <AutoField name="googleApiKey" />
                <ErrorField name="googleApiKey" />

                <AutoField name="appleApiKey" />
                <ErrorField name="appleApiKey" />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <AutoField name="fbApiStatus" />
                <ErrorField name="fbApiStatus" />

                <AutoField name="googleApiStatus" />
                <ErrorField name="googleApiStatus" />

                <AutoField name="appleApiStatus" />
                <ErrorField name="appleApiStatus" />
              </Grid>
            </Grid>

            <Typography variant="body1" sx={{ mt: 5, mb: 2 }}>
              Firebase Messaging Settings
            </Typography>

            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <AutoField name="fcmKey" />
                <ErrorField name="fcmKey" />
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

export default General;
