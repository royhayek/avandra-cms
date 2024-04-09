// Packages
import _ from 'lodash';
import getSchema from 'schemas';
import classNames from 'classnames';
import { DeepPartial } from 'redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';

// Components
import Card from 'shared/components/Card';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import SubmitField from 'shared/components/Controls/SubmitField';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { getFaqQuestions } from 'redux/faqs/slice';
import { getDataLanguage } from 'redux/services/ui/slice';
import { getLanguages } from 'redux/services/config/slice';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';
import { createFaqQuestionAction, modifyFaqQuestionAction } from 'redux/faqs/thunks';

// Interfaces
import { FaqProps } from 'shared/types/Faq';
import { FaqCategoryProps } from 'shared/types/FaqCategory';

interface RouteParams {
  faq: FaqProps;
  faqCategory: FaqCategoryProps;
}

// Component

const Form = () => {
  // Redux
  const dispatch = useAppThunkDispatch();

  const languages = useAppSelector(getLanguages);
  const dataLang = useAppSelector(getDataLanguage);
  const faqQuestions = useAppSelector(getFaqQuestions);

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

  const { faqCategory, faq } = history.location.state as RouteParams;

  const [schema, setSchema] = useState<Bridge>();
  const [model, setModel] = useState<FaqProps | undefined>();

  const modify = !_.isEmpty(faq);

  // Callbacks
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('faqQuestionSchema', classes, { languages, defaultLang: dataLang }, {}));
    } catch (err) {
      console.error('Error in [Traveler Form - setSchemaDef] :: ', err);
    }
  }, [classes, dataLang, languages]);

  const handleSubmit = useCallback(
    async (model) => {
      console.debug('[handleSubmit] :: ', { model });
      const { _id, language, question, answer, order, enabled } = model;

      const orderExists = _.some(
        faqQuestions,
        (q) => _.isEqual(q.order, order) && _.isEqual(q.language?._id, language)
      );

      if ((orderExists && !modify) || (orderExists && modify && !_.isEqual(faq?.order, order))) {
        toast.error('Order already exists, increment it by 1.');

        return;
      }

      const payload = { _id, language, question, answer, category: faqCategory?._id, order, enabled };
      const response = await dispatch(modify ? modifyFaqQuestionAction(payload) : createFaqQuestionAction(payload));

      if (response.payload.success) history.goBack();
    },
    [dispatch, faq, faqCategory?._id, faqQuestions, history, modify]
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
        <Typography variant="h5">{modify ? 'Modify' : 'New'} Question</Typography>
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

                <AutoField name="question" />
                <ErrorField name="question" />

                <AutoField name="answer" />
                <ErrorField name="answer" />

                <AutoField name="order" />
                <ErrorField name="order" />

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
              <Box
                className={classNames(classes.previewAccordion, {
                  rtl: _.isEqual(_.find(languages, { _id: model?.language })?.value, 'ar')
                })}>
                <Box className={classes.previewHeader}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {model?.question ?? 'Lorem Ipsum'}
                  </Typography>
                  <ExpandMoreIcon color="secondary" />
                </Box>
                <Divider />
                <Box className={classes.previewBody}>
                  <Typography variant="body2">{model?.answer ?? 'Lorem Ipsum'}</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Form;
