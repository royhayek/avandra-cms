// Packages
import _ from 'lodash';
import getSchema from 'schemas';
import { DeepPartial } from 'redux';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';

// Components
import Card from 'shared/components/Card';
import { Box, Grid, Typography } from '@mui/material';
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import SubmitField from 'shared/components/Controls/SubmitField';

// Utilities
import useStyles from './styles';
import { ProfileModelProps } from 'redux/user/types';
import { updateProfileAction } from 'redux/user/thunks';
import { getUser, getUserLoading } from 'redux/user/slice';
import { AppThunkDispatch, useAppSelector } from 'app/store';
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';

// Component

const Profile = () => {
  // Redux
  const dispatch = useDispatch<AppThunkDispatch>();

  const user = useAppSelector(getUser);
  const isUsersLoading = useAppSelector(getUserLoading);

  // Statics
  const styles = useStyles();
  const formStyles = useFormStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...formStyles, ...styles }), [commonStyles, formStyles, styles]);

  const form = useRef<BaseForm<
    DeepPartial<unknown>,
    BaseFormProps<DeepPartial<unknown>>,
    BaseFormState<DeepPartial<unknown>>
  > | null>(null);

  const [schema, setSchema] = useState<Bridge>();
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirmation: false });

  const [model, setModel] = useState<ProfileModelProps>({
    _id: user?._id,
    name: user?.name,
    email: user?.email
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
      setSchema(getSchema('userProfileSchema', classes, { show: showPassword }, { toggle }));
    } catch (err) {
      console.error('Error in [User Profile - setSchemaDef] :: ', err);
    }
  }, [classes, showPassword, toggle]);

  const handleSubmit = useCallback(
    (model) => {
      console.debug('[handleSubmit] :: ', { model });
      const { _id, name, email, currentPassword, password, confPassword } = model;

      if (password && confPassword && !currentPassword) {
        toast.error('Current password cannot be empty');

        return;
      }

      if ((currentPassword && !password && !confPassword) || !_.isEqual(password, confPassword)) {
        toast.error("New Password and Confirmed Password doesn't match");

        return;
      }

      dispatch(updateProfileAction({ _id, email, name, currentPassword, password }));
      setModel({ ...model, currentPassword: undefined, password: undefined, confPassword: undefined });
    },
    [dispatch]
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
        <Typography variant="h5">My Profile</Typography>
      </Box>

      <Card>
        {schema ? (
          <AutoForm ref={form} placeholder schema={schema} model={model} onSubmit={handleSubmit}>
            <Grid container columnSpacing={2} rowGap={6} m={1}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography>Information</Typography>

                <AutoField name="name" />
                <ErrorField name="name" />
                <AutoField name="email" />
                <ErrorField name="email" />
              </Grid>

              <Grid item xs={12} sm={12} md={6}></Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography>Password</Typography>
                <AutoField name="currentPassword" />
                <ErrorField name="currentPassword" />
                <AutoField name="password" />
                <ErrorField name="password" />
                <AutoField name="confPassword" />
                <ErrorField name="confPassword" />
              </Grid>
            </Grid>

            <Box className={classes.footer}>
              <SubmitField title="Save" loading={isUsersLoading} />
            </Box>
          </AutoForm>
        ) : null}
      </Card>
    </>
  );
};

export default Profile;
