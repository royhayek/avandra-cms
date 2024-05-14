// Packages
import _ from 'lodash';
import getSchema from 'schemas';
import { DeepPartial } from 'redux';
import classNames from 'classnames';
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
import { getDataLanguage } from 'redux/services/ui/slice';
import { getLanguages } from 'redux/services/config/slice';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';
import { createArticleAction, modifyArticleAction } from 'redux/articles/thunks';

// Interfaces
import { ArticleProps } from 'shared/types/Article';

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
  const classes = { ...commonStyles, ...formStyles, ...styles };

  const form = useRef<BaseForm<
    DeepPartial<unknown>,
    BaseFormProps<DeepPartial<unknown>>,
    BaseFormState<DeepPartial<unknown>>
  > | null>(null);

  const article = history.location.state as ArticleProps;
  const [schema, setSchema] = useState<Bridge>();
  const [model, setModel] = useState<ArticleProps | undefined>();

  const modify = !_.isEmpty(article);

  // Callbacks
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('articleSchema', {}, { languages, defaultLang: dataLang }, {}));
    } catch (err) {
      console.error('Error in [User Form - setSchemaDef] :: ', err);
    }
  }, [dataLang, languages]);

  const handleSubmit = useCallback(
    async (model) => {
      const { _id, name, image, date, details, language, enabled } = model;

      const payload = {
        _id,
        name,
        date,
        details,
        enabled,
        language,
        image: _.isString(image) ? null : image
      };

      const response = await dispatch(modify ? modifyArticleAction(payload) : createArticleAction(payload));

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
      ...article,
      language:
        !article?.language && _.isEqual(dataLang, 'all')
          ? _.find(languages, { value: 'en' })?._id
          : article?.language?._id
    });
  }, [article, dataLang, languages]);

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">{modify ? 'Modify' : 'New'} Article</Typography>
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

                <AutoField name="image" />
                <ErrorField name="image" />

                <AutoField name="name" />
                <ErrorField name="name" />

                <AutoField name="date" />
                <ErrorField name="date" />

                <AutoField name="details" />
                <ErrorField name="details" />

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
                  <Box width={220}>
                    {model?.image ? (
                      <img
                        alt="Article"
                        src={
                          _.isString(model?.image)
                            ? `${process.env.REACT_APP_PUBLIC_URL}/uploads/article/image/${model?.image}`
                            : URL.createObjectURL(model?.image)
                        }
                        className={classes.previewImage}
                      />
                    ) : null}
                    <Box mx={0.8}>
                      <Typography my={0.2}>{model?.name}</Typography>
                      <Box className={classNames(classes.row, 'center')}>
                        <Typography variant="body2" color={theme.colors.secondary}>
                          {model?.date}
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
