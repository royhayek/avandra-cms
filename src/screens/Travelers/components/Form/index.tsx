// Packages
import _ from 'lodash';
import getSchema from 'schemas';
import { DeepPartial } from 'redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';

// Components
import Card from 'shared/components/Card';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import SubmitField from 'shared/components/Controls/SubmitField';
import { Box, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { AppThunkDispatch } from 'app/store';
import { TravelOptionProps } from 'shared/types/Traveler';
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';
import { createTravelerAction, modifyTravelerAction } from 'redux/travelers/thunks';

// Component

const Form = () => {
  // Redux
  const dispatch = useDispatch<AppThunkDispatch>();

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

  const traveler = history.location.state as TravelOptionProps;
  const [schema, setSchema] = useState<Bridge>();
  const [model, setModel] = useState<TravelOptionProps | undefined>();

  const modify = !_.isEmpty(traveler);

  // Callbacks
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('travelOptionSchema', {}, {}, {}));
    } catch (err) {
      console.error('Error in [Traveler Form - setSchemaDef] :: ', err);
    }
  }, []);

  const handleSubmit = useCallback(
    async (model) => {
      console.debug('[handleSubmit] :: ', { model });
      const { _id, icon, title, description, enabled } = model;

      const payload = { _id, icon, title, description, enabled };
      const response = await dispatch(modify ? modifyTravelerAction(payload) : createTravelerAction(payload));

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
      ...traveler,
      icon: traveler?.icon,
      title: _.find(traveler?.title, { type: 'en' })?.content,
      description: _.find(traveler?.description, { type: 'en' })?.content
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traveler]);

  console.debug('model', model);

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">{modify ? 'Modify' : 'New'} Traveler</Typography>
      </Box>

      <Card>
        <Grid container columnSpacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            {schema ? (
              <AutoForm
                ref={form}
                placeholder
                model={model}
                schema={schema}
                onSubmit={handleSubmit}
                onChange={handleModelChange}>
                <Typography mb={1}>Information</Typography>

                <AutoField name="icon" />
                <ErrorField name="icon" />

                <AutoField name="title" />
                <ErrorField name="title" />

                <AutoField name="description" />
                <ErrorField name="description" />

                <AutoField name="enabled" />
                <ErrorField name="enabled" />

                <Box className={classes.footer}>
                  <SubmitField title="Submit" />
                </Box>
              </AutoForm>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Typography mb={2} textAlign="center">
              In-App Preview
            </Typography>

            <Card
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center'
              }}>
              <Box className={classes.previewButton}>
                <Typography variant="body1" mb={0.6}>
                  {model?.title ?? 'Lorem Ipsum'} {model?.icon ?? 'ℹ️'}
                </Typography>
                <Typography variant="caption" my={0.2}>
                  {model?.description ?? 'Lorem Ipsum is simply dummy text of the printing'}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Form;
