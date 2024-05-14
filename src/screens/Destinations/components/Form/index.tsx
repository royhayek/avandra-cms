// Packages
import _ from 'lodash';
import getSchema from 'schemas';
import { DeepPartial } from 'redux';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';

// Components
import Card from 'shared/components/Card';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import SubmitField from 'shared/components/Controls/SubmitField';
import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';

// Utilities
import useStyles from './styles';
import { getDataLanguage } from 'redux/services/ui/slice';
import { getLanguages } from 'redux/services/config/slice';
import { DestinationProps } from 'shared/types/Destination';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';
import { createDestinationAction, modifyDestinationAction } from 'redux/destinations/thunks';

// Component

const Form = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const languages = useAppSelector(getLanguages);
  const dataLang = useAppSelector(getDataLanguage);

  // Statics
  const theme = useTheme();
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

  const city = history.location.state as DestinationProps;

  const [schema, setSchema] = useState<Bridge>();
  const [model, setModel] = useState<DestinationProps | undefined>();

  const modify = !_.isEmpty(city);

  // Callbacks
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('destinationSchema', classes, { languages, defaultLang: dataLang }, {}));
    } catch (err) {
      console.error('Error in [User Form - setSchemaDef] :: ', err);
    }
  }, [classes, dataLang, languages]);

  const handleSubmit = useCallback(
    async (model) => {
      console.debug('[handleSubmit] :: ', { model });

      const {
        _id,
        language,
        name,
        country,
        continent,
        bestTime,
        spokenLang,
        currency,
        description,
        image,
        flag,
        gallery,
        enabled
      } = model;

      const formData = new FormData();
      modify && formData.append('_id', _id);
      formData.append('language', language);
      formData.append('name', name);
      formData.append('country', country);
      formData.append('continent', continent);
      formData.append('bestTime', bestTime);
      formData.append('spokenLang', spokenLang);
      formData.append('currency', currency);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('flag', flag);
      gallery.forEach((file) => formData.append('gallery', file));
      formData.append('enabled', enabled);

      const response = await dispatch(modify ? modifyDestinationAction(formData) : createDestinationAction(formData));

      if (response.payload.success) history.goBack();
    },
    [dispatch, history, modify]
  );

  const handleModelChange = useCallback(
    (key: string, value: any) => {
      const newModel = _.set(structuredClone(model) as DestinationProps, key, value);
      setModel(newModel);
    },
    [model]
  );

  // Effects
  useEffect(() => {
    setSchemaDef();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setModel({
      ...city,
      language:
        !city?.language && _.isEqual(dataLang, 'all') ? _.find(languages, { value: 'en' })?._id : city?.language?._id
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

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

                <AutoField name="language" />
                <ErrorField name="language" />

                <AutoField name="name" />
                <ErrorField name="name" />

                <AutoField name="description" />
                <ErrorField name="description" />

                <AutoField name="country" />
                <ErrorField name="country" />

                <AutoField name="bestTime" />
                <ErrorField name="bestTime" />

                <AutoField name="spokenLang" />
                <ErrorField name="spokenLang" />

                <AutoField name="continent" />
                <ErrorField name="continent" />

                <AutoField name="currency" />
                <ErrorField name="currency" />

                <AutoField name="enabled" />
                <ErrorField name="enabled" />

                <Grid container spacing={2} mt={1}>
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
                            ? `${process.env.REACT_APP_PUBLIC_URL}/uploads/destination/image/${model?.image}`
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
                                ? `${process.env.REACT_APP_PUBLIC_URL}/uploads/destination/flag/${model?.flag}`
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
