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
import {
  createBudgetAction,
  createTravelerAction,
  modifyBudgetAction,
  modifyTravelerAction
} from 'redux/traveloption/thunks';

// Interfaces
import { TravelOptionProps } from 'shared/types/TravelOption';

interface RouteProps {
  data: TravelOptionProps;
  type: string;
}

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

  const traveler = history.location.state as RouteProps;

  const [schema, setSchema] = useState<Bridge>();
  const [model, setModel] = useState<TravelOptionProps | undefined>();

  const type = traveler?.type;
  const modify = !_.isEmpty(traveler?.data);

  const isTraveler = _.isEqual(type, 'traveler');

  // Callbacks
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('travelOptionSchema', classes, { languages, defaultLang: dataLang }, {}));
    } catch (err) {
      console.error('Error in [Traveler Form - setSchemaDef] :: ', err);
    }
  }, [classes, dataLang, languages]);

  const handleSubmit = useCallback(
    async (model) => {
      console.debug('[handleSubmit] :: ', { model });
      const { _id, language, icon, title, description, enabled } = model;

      const payload = { _id, language, icon, title, description, enabled };

      const response = await dispatch(
        modify
          ? isTraveler
            ? modifyTravelerAction(payload)
            : modifyBudgetAction(payload)
          : isTraveler
            ? createTravelerAction(payload)
            : createBudgetAction(payload)
      );

      if (response.payload.success) history.goBack();
    },
    [dispatch, history, isTraveler, modify]
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
      ...traveler.data,
      language:
        !traveler?.data && _.isEqual(dataLang, 'all')
          ? _.find(languages, { value: 'en' })?._id
          : traveler?.data?.language?._id
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traveler.data]);

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
                justifyContent: 'center',
                direction: _.find(languages, { _id: model?.language })?.rtl ? 'rtl' : 'ltr'
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
