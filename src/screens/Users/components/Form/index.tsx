// Packages
import _ from 'lodash';
import getSchema from 'schemas';
import { DeepPartial } from 'redux';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';

// Components
import Card from 'shared/components/Card';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import SubmitField from 'shared/components/Controls/SubmitField';
import { Avatar, Box, Grid, IconButton, Typography, useTheme } from '@mui/material';

// Utilities
import useStyles from './styles';
import { UserProps } from 'shared/types/User';
import { getUserUpdating } from 'redux/users/slice';
import { AppThunkDispatch, useAppSelector } from 'app/store';
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';
import { createUserAction, updateUserAction } from 'redux/users/thunks';

// Component

const Form = () => {
  // Redux
  const dispatch = useDispatch<AppThunkDispatch>();

  const isUserUpdating = useAppSelector(getUserUpdating);

  // Statics
  const history = useHistory();
  const theme = useTheme();
  const styles = useStyles();
  const formStyles = useFormStyles();
  const commonStyles = useCommonStyles();

  const classes = useMemo(() => ({ ...commonStyles, ...formStyles, ...styles }), [commonStyles, formStyles, styles]);

  const form = useRef<BaseForm<
    DeepPartial<unknown>,
    BaseFormProps<DeepPartial<unknown>>,
    BaseFormState<DeepPartial<unknown>>
  > | null>(null);

  const user = history.location.state as UserProps;
  const { _id, name, email, status, gender, country, role, provider } = user || {};
  const modify = !_.isEmpty(user);

  const [schema, setSchema] = useState<Bridge>();
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirmation: false });

  const [model] = useState({
    _id,
    role,
    name,
    email,
    gender,
    country,
    status,
    provider
  });

  // Callbacks
  const toggle = useCallback((name) => {
    switch (name) {
      case 'currentPassword':
        setShowPassword((cur) => ({ ...cur, current: !cur.current }));
        break;

      case 'password':
        setShowPassword((cur) => ({ ...cur, new: !cur.new }));
        break;

      case 'confPassword':
        setShowPassword((cur) => ({ ...cur, confirmation: !cur.confirmation }));
        break;

      default:
        setShowPassword({ current: false, new: false, confirmation: false });
        break;
    }
  }, []);

  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('userSchema', classes, { modify, show: showPassword }, { toggle }));
    } catch (err) {
      console.error('Error in [User Form - setSchemaDef] :: ', err);
    }
  }, [classes, modify, showPassword, toggle]);

  const handleSubmit = useCallback(
    async (model) => {
      console.debug('[handleSubmit] :: ', model);
      const { _id, email, name, role, enabled, currentPassword, confPassword, password } = model;

      if (password && user && confPassword && !currentPassword) {
        toast.error('Current password cannot be empty');

        return;
      }

      if ((currentPassword && !password && !confPassword) || !_.isEqual(password, confPassword)) {
        toast.error(
          modify
            ? "Password and password confirmation doesn't match"
            : "New Password and password confirmation doesn't match"
        );

        return;
      }

      const payload = { _id, email, name, role, enabled, currentPassword, password };
      const response = await dispatch(user ? updateUserAction(payload) : createUserAction(payload));
      console.debug('response.payload', response.payload);
      if (response.payload.success) history.goBack();
    },
    [dispatch, history, modify, user]
  );

  // Effects
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setSchemaDef();
  }, [showPassword]);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Renderers
  return (
    <>
      <Box className={classes.header}>
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">Edit User Info</Typography>
      </Box>

      <Card>
        {schema ? (
          <AutoForm ref={form} schema={schema} model={model} onSubmit={handleSubmit} placeholder>
            <Grid container flexDirection="row" justifyContent="center">
              <Avatar
                alt={name}
                variant="rounded"
                src="/static/images/avatar/1.jpg"
                sx={{ fontSize: theme.typography.h4.fontSize, color: theme.colors.white, width: 100, height: 100 }}
              />
            </Grid>

            <Typography my={2}>Information</Typography>

            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {user ? (
                  <>
                    <AutoField name="_id" />
                    <ErrorField name="_id" />
                  </>
                ) : null}
                <AutoField name="name" />
                <ErrorField name="name" />
                <AutoField name="email" />
                <ErrorField name="email" />
                <AutoField name="gender" />
                <ErrorField name="gender" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="country" />
                <ErrorField name="country" />
                <AutoField name="provider" />
                <ErrorField name="provider" />
                <AutoField name="role" />
                <ErrorField name="role" />
                <AutoField name="enabled" />
                <ErrorField name="enabled" />
              </Grid>
            </Grid>

            <Typography marginTop={3} marginBottom={2}>
              Password
            </Typography>

            <Grid item xs={12} sm={12} md={6}>
              {user ? (
                <>
                  <AutoField name="currentPassword" />
                  <ErrorField name="currentPassword" />
                </>
              ) : null}
              <AutoField name="password" />
              <ErrorField name="password" />
              <AutoField name="confPassword" />
              <ErrorField name="confPassword" />
            </Grid>

            <Box className={classes.footer}>
              <SubmitField title="Save" loading={isUserUpdating} />
            </Box>
          </AutoForm>
        ) : null}
      </Card>
    </>
  );
};

export default Form;
