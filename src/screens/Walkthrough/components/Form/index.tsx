// Packages
import _ from 'lodash';
import getSchema from 'schemas';
import { DeepPartial } from 'redux';
import { useHistory } from 'react-router-dom';
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';

// Components
import Card from 'shared/components/Card';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Button from 'shared/components/Buttons/Primary';
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import SubmitField from 'shared/components/Controls/SubmitField';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';

// Utilities
import useStyles from './styles';
import { getDataLanguage } from 'redux/services/ui/slice';
import { getLanguages } from 'redux/services/config/slice';
import { useAppSelector, useAppThunkDispatch } from 'app/store';
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';
import { createWalkthroughAction, modifyWalkthroughAction } from 'redux/walkthrough/thunks';

// Interfaces
import { WalkthroughProps } from 'shared/types/Walkthrough';

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

  const walkthrough = history.location.state as WalkthroughProps;
  const [schema, setSchema] = useState<Bridge>();
  const [model, setModel] = useState<WalkthroughProps | undefined>();

  const modify = !_.isEmpty(walkthrough);

  // Callbacks
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('walkthroughSchema', classes, { languages, defaultLang: dataLang }, {}));
    } catch (err) {
      console.error('Error in [User Form - setSchemaDef] :: ', err);
    }
  }, [classes, dataLang, languages]);

  const handleSubmit = useCallback(
    async (model) => {
      console.debug('[handleSubmit] :: ', { model });
      const { _id, language, title, description, image, enabled } = model;

      const payload = { _id, language, title, description, image: _.isString(image) ? null : image, enabled };
      const response = await dispatch(modify ? modifyWalkthroughAction(payload) : createWalkthroughAction(payload));

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
      ...walkthrough,
      language:
        !walkthrough?.language && _.isEqual(dataLang, 'all')
          ? _.find(languages, { value: 'en' })?._id
          : walkthrough?.language?._id
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walkthrough]);

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">{modify ? 'Modify' : 'New'} Walkthrough</Typography>
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

                <AutoField name="title" />
                <ErrorField name="title" />

                <AutoField name="description" />
                <ErrorField name="description" />

                <Box className={classes.footer}>
                  <SubmitField title="Submit" />
                </Box>
              </Grid>

              {/* In-App Preview */}
              <Grid item xs={12} sm={12} md={6}>
                <Typography mb={2} textAlign="center">
                  In-App Preview
                </Typography>

                <Card className={classes.previewContainer}>
                  {model?.image && (
                    <Box className={classes.relativeContainer}>
                      {model?.image ? (
                        <img
                          alt="Image"
                          src={
                            _.isString(model?.image)
                              ? `${process.env.REACT_APP_PUBLIC_URL}/uploads/walkthrough/image/${model?.image}`
                              : URL.createObjectURL(model?.image)
                          }
                          className={classes.previewImage}
                        />
                      ) : null}
                      <Box className={classes.bottomContainer}>
                        <Typography variant="h6" className={classes.previewTitle}>
                          {model?.title}
                        </Typography>
                        <Typography className={classes.previewDescription}>{model?.description}</Typography>

                        <Box className={classes.previewIndicator}>
                          <Box className={classes.activeDot} />
                          {_.times(2, (i) => (
                            <Box key={i} className={classes.dot} />
                          ))}
                        </Box>

                        <Divider className={classes.divider} />

                        <Box className={classes.buttonsContainer}>
                          <Button text="Skip" color="secondary" onClick={() => null} className={classes.skipButton} />
                          <Button text="Continue" onClick={() => null} className={classes.continueButton} />
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Card>
              </Grid>
            </Grid>
          </AutoForm>
        ) : null}
      </Card>
    </>
  );
};

export default Form;
