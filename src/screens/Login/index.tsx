// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { BaseForm, BaseFormProps, BaseFormState } from 'uniforms';
import { useDispatch } from 'react-redux';
import { DeepPartial } from 'redux';
import getSchema from 'schemas';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import SubmitField from 'shared/components/Controls/SubmitField';
import { Box, Button, Modal, Typography } from '@mui/material';
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import ResetPassword from './components/ResetPassword';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';
import { AppThunkDispatch, useAppSelector } from 'app/store';
import { getAuthLoading } from 'redux/services/auth/slice';
import { loginAction } from 'redux/services/auth/thunks';
import useStyles from './styles';
//----------------------------------------------------//
//------------------- COMPONENT ----------------------//
//----------------------------------------------------//

const Login = () => {
  // --------------------------------------------------------- //
  // ------------------------ Redux -------------------------- //
  const dispatch = useDispatch<AppThunkDispatch>();

  const isAuthLoading = useAppSelector(getAuthLoading);
  // ----------------------- /Redux -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const form = useRef<BaseForm<
    DeepPartial<unknown>,
    BaseFormProps<DeepPartial<unknown>>,
    BaseFormState<DeepPartial<unknown>>
  > | null>(null);

  const styles = useStyles();
  const formStyles = useFormStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...styles, ...formStyles, ...commonStyles }), [commonStyles, formStyles, styles]);

  const [schema, setSchema] = useState<SimpleSchema2Bridge>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const togglePassVisibility = useCallback(
    (name) => {
      console.debug('[togglePassVisibility] :: ', { name });
      setPasswordVisible((cur) => !cur);
    },
    [setPasswordVisible]
  );

  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('loginSchema', classes, { passwordVisible }, { togglePassVisibility }));
    } catch (err) {
      console.error('Error in [LoginForm - setSchemaDef] :: ', err);
    }
  }, [classes, passwordVisible, togglePassVisibility]);

  const handleSubmit = useCallback(
    async (model) => {
      console.debug('[handleSubmit] :: ', { model });
      const { email, password } = model;
      dispatch(loginAction({ email, password }));
    },
    [dispatch]
  );

  const togglePasswordModal = useCallback(() => setOpenPasswordModal((cur) => !cur), []);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // ----------------------- /Effects ------------------------ //
  // --------------------------------------------------------- //
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setSchemaDef();
  }, [passwordVisible]);
  /* eslint-enable react-hooks/exhaustive-deps */
  // ----------------------- /Effects ------------------------ //
  // --------------------------------------------------------- //

  //----------------------------------------------------//
  //------------------- RENDERERES ---------------------//
  const renderHeader = useMemo(
    () => (
      <>
        <Typography align="center" marginBottom={3}>
          Login
        </Typography>
        <Typography variant="body2" marginBottom={1}>
          Please fill your email and password to login
        </Typography>
      </>
    ),
    []
  );

  const renderForm = useMemo(
    () =>
      schema ? (
        <AutoForm ref={form} schema={schema} onSubmit={handleSubmit} placeholder>
          <AutoField name="email" />
          <ErrorField name="email" />

          <AutoField name="password" />
          <ErrorField name="password" />

          <Button onClick={togglePasswordModal} className={classes.forgotPassBtn}>
            Forgot password?
          </Button>

          <Box className={classes.footer}>
            <SubmitField title="Login" loading={isAuthLoading} />
          </Box>
        </AutoForm>
      ) : null,
    [schema, handleSubmit, togglePasswordModal, classes.forgotPassBtn, classes.footer, isAuthLoading]
  );

  const renderPasswordModal = useMemo(
    () => (
      <Modal
        open={openPasswordModal}
        onClose={togglePasswordModal}
        aria-labelledby="password-modal-title"
        aria-describedby="password-modal-description">
        <Box>
          <ResetPassword toggle={togglePasswordModal} />
        </Box>
      </Modal>
    ),
    [openPasswordModal, togglePasswordModal]
  );

  return (
    <Box className={classes.container}>
      <Box className={classes.card}>
        {renderHeader}
        {renderForm}
        {renderPasswordModal}
      </Box>
    </Box>
  );
};

export default Login;
