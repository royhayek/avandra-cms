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
import { createFaqCategoryAction, modifyFaqCategoryAction } from 'redux/faqs/thunks';

// Interfaces
import { FaqCategoryProps } from 'shared/types/FaqCategory';

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

  const faq = history.location.state as FaqCategoryProps;

  const [schema, setSchema] = useState<Bridge>();
  const [model, setModel] = useState<FaqCategoryProps | undefined>();

  const modify = !_.isEmpty(faq);

  // Callbacks
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('faqSchema', classes, { languages, defaultLang: dataLang }, {}));
    } catch (err) {
      console.error('Error in [Traveler Form - setSchemaDef] :: ', err);
    }
  }, [classes, dataLang, languages]);

  const handleSubmit = useCallback(
    async (model) => {
      console.debug('[handleSubmit] :: ', { model });
      const { _id, language, name, enabled } = model;

      const payload = { _id, language, name, enabled };
      const response = await dispatch(modify ? modifyFaqCategoryAction(payload) : createFaqCategoryAction(payload));

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
      ...faq,
      language:
        !faq?.language && _.isEqual(dataLang, 'all') ? _.find(languages, { value: 'en' })?._id : faq?.language?._id
    });
  }, [dataLang, faq, languages]);

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">{modify ? 'Modify' : 'New'} Category</Typography>
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

                <AutoField name="name" />
                <ErrorField name="name" />

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
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {model?.name ?? 'Lorem Ipsum'}
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
