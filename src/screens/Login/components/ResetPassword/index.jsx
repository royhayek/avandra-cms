// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import classNames from "classnames";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { AutoField, AutoForm, ErrorField } from "uniforms-mui";
import RegularButton from "components/Buttons/Primary";
import { Box, Typography } from "@mui/material";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import getSchema from "schemas";
import { useCommonStyles, useFormStyles } from "lib/styles/index.ts";
import useStyles from "./styles.ts";
//----------------------------------------------------//
//------------------- COMPONENT ----------------------//
//----------------------------------------------------//
const ResetPassword = ({ toggle }) => {
  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const form = useRef();

  const styles = useStyles();
  const formStyles = useFormStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...styles, ...formStyles, ...commonStyles }), [commonStyles, formStyles, styles]);

  const [schema, setSchema] = useState();
  const [model, setModel] = useState({});
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema("resetPassSchema", {}, {}, {}));
    } catch (err) {
      console.error("Error in [ResetPassword - setSchemaDef] :: ", err);
    }
  }, []);

  const handleSubmit = useCallback(model => {
    console.debug("[handleSubmit] :: ", { model });
    toast.success("Reset request sent successfully");
  }, []);

  const handleModelChange = useCallback(model => setModel(model), []);
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
        <Typography mb={2}>Forgot your password?</Typography>
        <Typography variant="caption">Please fill your email to send you a reset code</Typography>
      </>
    ),
    [],
  );

  const renderFooter = useMemo(
    () => (
      <Box className={classNames(classes.row, "flexEnd gap")}>
        <RegularButton variant="outlined" text="Cancel" onClick={toggle} />
        <RegularButton text="Reset" onClick={() => form.current.submit()} />
      </Box>
    ),
    [classes.row, toggle],
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
        </AutoForm>
      ) : null,
    [handleModelChange, handleSubmit, schema, model],
  );

  return (
    <Box className={classes.modal}>
      <Box>
        {renderHeader}
        {renderForm}
      </Box>
      {renderFooter}
    </Box>
  );
};

export default ResetPassword;
