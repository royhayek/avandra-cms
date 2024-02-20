// Packages
import _ from 'lodash';
import getSchema from 'schemas';
import { DeepPartial } from 'redux';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';

// Components
import Card from 'shared/components/Card';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import SubmitField from 'shared/components/Controls/SubmitField';
import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';

// Utilities
import useStyles from './styles';
import { AppThunkDispatch } from 'app/store';
import { DestinationProps } from 'shared/types/Destination';
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';
import { createDestinationAction, modifyDestinationAction } from 'redux/destinations/thunks';

// Component

const Form = () => {
  // Redux
  const dispatch = useDispatch<AppThunkDispatch>();

  // Statics
  const theme = useTheme();
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

  const city = history.location.state as DestinationProps;
  const [schema, setSchema] = useState<Bridge>();
  const [model, setModel] = useState<DestinationProps | undefined>();

  const modify = !_.isEmpty(city);

  // Callbacks
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('destinationSchema', {}, {}, {}));
    } catch (err) {
      console.error('Error in [User Form - setSchemaDef] :: ', err);
    }
  }, []);

  const handleSubmit = useCallback(
    async (model) => {
      console.debug('[handleSubmit] :: ', { model });
      const { _id, name, country, image, enabled } = model;

      const payload = { _id, name, country, enabled, image: _.isString(image) ? null : image };
      const response = await dispatch(modify ? modifyDestinationAction(payload) : createDestinationAction(payload));

      if (response.payload.success) history.goBack();
    },
    [dispatch, history, modify]
  );

  const handleModelChange = useCallback((key: string, value: any) => {
    console.debug('[handleModelChange] :: ', { key, value });
    setModel((prevModel) => _.merge({}, prevModel, { [key]: value }));
  }, []);

  // Effects
  useEffect(() => {
    setSchemaDef();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setModel({
      ...city,
      name: _.find(city?.name, { type: 'en' })?.content,
      country: _.find(city?.country, { type: 'en' })?.content,
      continent: _.find(city?.continent, { type: 'en' })?.content,
      currency: _.find(city?.currency, { type: 'en' })?.content
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  console.debug('model', model);

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">{modify ? 'Modify' : 'New'} Destination</Typography>
      </Box>

      <Card>
        {schema ? (
          <AutoForm
            ref={form}
            placeholder
            model={model}
            schema={schema}
            onSubmit={handleSubmit}
            onChange={handleModelChange}>
            <Grid container columnSpacing={4}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography mb={1}>Information</Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <AutoField name="image" />
                    <ErrorField name="image" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <AutoField name="flag" />
                    <ErrorField name="flag" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <AutoField name="gallery" />
                    <ErrorField name="gallery" />
                  </Grid>
                </Grid>

                <AutoField name="name" />
                <ErrorField name="name" />
                <AutoField name="country" />
                <ErrorField name="country" />
                <AutoField name="continent" />
                <ErrorField name="continent" />
                <AutoField name="currency" />
                <ErrorField name="currency" />
                <AutoField name="enabled" />
                <ErrorField name="enabled" />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography mb={2} textAlign="center">
                  In-App Preview
                </Typography>

                <Card
                  sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: theme.colors.background
                  }}>
                  <Box>
                    {model?.image ? (
                      <img
                        alt="Destination"
                        src={
                          _.isString(model?.image)
                            ? `${process.env.REACT_APP_PUBLIC_URL}uploads/destination/image/${model?.image}`
                            : URL.createObjectURL(model?.image)
                        }
                        className={classes.previewImage}
                      />
                    ) : null}
                    <Box mx={0.8}>
                      <Typography my={0.2}>{model?.name}</Typography>
                      <Box className={classNames(classes.row, 'center')}>
                        {model?.flag ? (
                          <img
                            alt="Flag"
                            src={
                              _.isString(model?.flag)
                                ? `${process.env.REACT_APP_PUBLIC_URL}uploads/destination/flag/${model?.flag}`
                                : URL.createObjectURL(model?.flag)
                            }
                            className={classes.previewFlag}
                          />
                        ) : null}
                        <Typography variant="body2" color={theme.colors.secondary}>
                          {model?.country}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
            <Box className={classes.footer}>
              <SubmitField title="Submit" />
            </Box>
          </AutoForm>
        ) : null}
      </Card>
    </>
  );
};

export default Form;
