// Packages
import _ from 'lodash';
import getSchema from 'schemas';
import { DeepPartial } from 'redux';
import { useHistory } from 'react-router-dom';
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';

// Components
import Card from 'shared/components/Card';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import SubmitField from 'shared/components/Controls/SubmitField';
import { Box, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { getDataLanguage } from 'redux/services/ui/slice';
import { getLanguages } from 'redux/services/config/slice';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';
import { createInterestAction, modifyInterestAction } from 'redux/interests/thunks';

// Interfaces
import { InterestProps } from 'shared/types/Interest';

// Component

const Form = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const languages = useAppSelector(getLanguages);
  const dataLang = useAppSelector(getDataLanguage);

  // Statics
  const history = useHistory();
  const styles = useStyles();
  const formStyles = useFormStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...formStyles, ...styles }), [commonStyles, formStyles, styles]);

  const form = useRef<BaseForm<
    DeepPartial<unknown>,
    BaseFormProps<DeepPartial<unknown>>,
    BaseFormState<DeepPartial<unknown>>
  > | null>(null);

  const interest = history.location.state as InterestProps;
  const [schema, setSchema] = useState<Bridge>();
  const [model, setModel] = useState<InterestProps | undefined>();

  const modify = !_.isEmpty(interest);

  // Callbacks
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('interestSchema', classes, { languages, defaultLang: dataLang }, {}));
    } catch (err) {
      console.error('Error in [Traveler Form - setSchemaDef] :: ', err);
    }
  }, [classes, dataLang, languages]);

  const handleSubmit = useCallback(
    async (model) => {
      console.debug('[handleSubmit] :: ', { model });
      const { _id, language, icon, title, enabled } = model;

      const payload = { _id, language, icon, title, enabled };
      const response = await dispatch(modify ? modifyInterestAction(payload) : createInterestAction(payload));

      if (response.payload.success) history.goBack();
    },
    [dispatch, history, modify]
  );

  const handleModelChange = useCallback((key: string, value: any) => {
    setModel((prevModel) => _.merge({}, prevModel, { [key]: value }));
  }, []);

  // Effects
  useEffect(() => {
    setSchemaDef();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setModel({
      ...interest,
      language:
        !interest?.language && _.isEqual(dataLang, 'all')
          ? _.find(languages, { value: 'en' })?._id
          : interest?.language?._id
    });
  }, [dataLang, interest, languages]);

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

                <AutoField name="language" />
                <ErrorField name="language" />

                <AutoField name="icon" />
                <ErrorField name="icon" />

                <AutoField name="title" />
                <ErrorField name="title" />

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
                <Typography variant="body2">
                  {model?.title ?? 'Lorem Ipsum'} {model?.icon ?? 'ℹ️'}
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
