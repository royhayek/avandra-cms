// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { DeepPartial } from 'redux';
import getSchema from 'schemas';
import _ from 'lodash';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Avatar, Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
import SubmitField from 'shared/components/Controls/SubmitField';
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Card from 'shared/components/Card';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';
import { AppThunkDispatch, useAppSelector } from 'app/store';
import { updateUserAction } from 'redux/users/thunks';
import { getUserUpdating } from 'redux/users/slice';
import { UserProps } from 'shared/types/User';
import useStyles from './styles.ts';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const Form = () => {
  // --------------------------------------------------------- //
  // ------------------------ Redux -------------------------- //
  const dispatch = useDispatch<AppThunkDispatch>();

  const isUserUpdating = useAppSelector(getUserUpdating);
  // ----------------------- /Redux -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
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

  const history = useHistory();
  const user = history.location.state as UserProps;
  const { _id, name, email, status, role, provider } = user;

  const [schema, setSchema] = useState<Bridge>();
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirmation: false });

  const [model] = useState({
    _id,
    role,
    name,
    email,
    status,
    provider
  });
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
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
      setSchema(getSchema('editUserSchema', classes, { show: showPassword }, { toggle }));
    } catch (err) {
      console.error('Error in [User Form - setSchemaDef] :: ', err);
    }
  }, [classes, showPassword, toggle]);

  const handleSubmit = useCallback(
    (model) => {
      const { _id, email, name, role, status, currentPassword, confPassword, password } = model;

      if (password && confPassword && !currentPassword) {
        toast.error('Current password cannot be empty');

        return;
      }

      if ((currentPassword && !password && !confPassword) || !_.isEqual(password, confPassword)) {
        toast.error("New Password and Confirmed Password doesn't match");

        return;
      }

      dispatch(updateUserAction({ _id, email, name, role, status, currentPassword, password }));

      setTimeout(() => history.goBack(), 500);
    },
    [dispatch, history]
  );
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ Effects ------------------------ //
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setSchemaDef();
  }, [showPassword]);
  /* eslint-enable react-hooks/exhaustive-deps */
  // ----------------------- /Effects ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
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
                <AutoField name="_id" />
                <ErrorField name="_id" />
                <AutoField name="name" />
                <ErrorField name="name" />
                <AutoField name="email" />
                <ErrorField name="email" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="provider" />
                <ErrorField name="provider" />
                <AutoField name="role" />
                <ErrorField name="role" />
                <AutoField name="status" />
                <ErrorField name="status" />
              </Grid>
            </Grid>

            <Typography marginTop={3} marginBottom={2}>
              Password
            </Typography>

            <Grid item xs={12} sm={12} md={6}>
              <AutoField name="currentPassword" />
              <ErrorField name="currentPassword" />
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
