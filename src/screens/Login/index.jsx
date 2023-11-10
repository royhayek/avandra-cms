// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import getSchema from "schemas";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, Button, Modal, Typography } from "@mui/material";
import { AutoField, AutoForm, ErrorField } from "uniforms-mui";
import RegularButton from "components/Buttons/Primary";
import ResetPassword from "./components/ResetPassword";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useCommonStyles, useFormStyles } from "lib/styles/index.ts";
import { authActions } from "redux/services/auth/slice";
import { login } from "redux/services/auth/api";
import useStyles from "./styles.ts";
//----------------------------------------------------//
//------------------- COMPONENT ----------------------//
//----------------------------------------------------//
const Login = () => {
  // --------------------------------------------------------- //
  // ------------------------ Redux -------------------------- //
  const dispatch = useDispatch();
  const updateAuth = useCallback(payload => dispatch(authActions.update(payload)), [dispatch]);
  // ----------------------- /Redux -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const form = useRef();

  const styles = useStyles();
  const formStyles = useFormStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...styles, ...formStyles, ...commonStyles }), [commonStyles, formStyles, styles]);

  const [schema, setSchema] = useState();
  const [model, setModel] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema("loginSchema", {}, {}, {}));
    } catch (err) {
      console.error("Error in [LoginForm - setSchemaDef] :: ", err);
    }
  }, []);

  const handleSubmit = useCallback(
    async model => {
      console.debug("[handleSubmit] :: ", { model });
      setLoading(true);
      await login({ email: model.email, password: model.password })
        .then(data => {
          console.debug("[handleSubmit] :: ", data);
          updateAuth({ token: data.data.token, authenticated: true });
        })
        .catch(error => console.debug("[handleSubmit] - error :: ", error))
        .finally(() => setLoading(false));
    },
    [updateAuth],
  );

  const handleModelChange = useCallback(model => setModel(model), []);

  const togglePasswordModal = useCallback(() => setOpenPasswordModal(cur => !cur), []);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // ----------------------- /Effects ------------------------ //
  // --------------------------------------------------------- //
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setSchemaDef();
  }, []);
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
    [],
  );

  const renderFooter = useMemo(
    () => (
      <Box className={classes.footer}>
        <RegularButton text="Login" onClick={() => form.current.submit()} />
      </Box>
    ),
    [classes.footer],
  );

  const renderForm = useMemo(
    () =>
      schema ? (
        <AutoForm
          ref={form}
          placeholder
          model={model}
          schema={schema}
          onSubmit={handleSubmit}
          onChangeModel={handleModelChange}>
          <AutoField name="email" />
          <ErrorField name="email" />

          <AutoField name="password" />
          <ErrorField name="password" />

          <Button onClick={togglePasswordModal} className={classes.forgotPassBtn}>
            Forgot password?
          </Button>
        </AutoForm>
      ) : null,
    [classes.forgotPassBtn, togglePasswordModal, handleModelChange, handleSubmit, schema, model],
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
    [openPasswordModal, togglePasswordModal],
  );

  return (
    <Box className={classes.container}>
      <Box className={classes.card}>
        {renderHeader}
        {renderForm}
        {renderFooter}
        {renderPasswordModal}
      </Box>
    </Box>
  );
};

export default Login;
