// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import getSchema from "schemas";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { AutoField, AutoForm, ErrorField } from "uniforms-mui";
import { Box, Grid, Typography } from "@mui/material";
import Button from "components/Buttons/Primary";
import Card from "components/Card";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useCommonStyles, useFormStyles } from "lib/styles/index.ts";
import { getUser } from "redux/user/slice";
import useStyles from "./styles.ts";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const Profile = () => {
  // --------------------------------------------------------- //
  // ------------------------ Redux -------------------------- //
  const user = useSelector(getUser);
  // ----------------------- /Redux -------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const styles = useStyles();
  const formStyles = useFormStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...commonStyles, ...formStyles, ...styles }), [commonStyles, formStyles, styles]);

  const form = useRef();

  const [schema, setSchema] = useState();
  const [model, setModel] = useState(user ?? {});
  const [showPassword, setShowPassword] = useState(false);
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const toggle = useCallback(name => setShowPassword(cur => !cur), []);

  const setSchemaDef = useCallback(() => {
    try {
      console.debug("showPassword", showPassword);

      setSchema(getSchema("userProfileSchema", classes, {}, { show: showPassword, toggle }));
    } catch (err) {
      console.error("Error in [User Profile - setSchemaDef] :: ", err);
    }
  }, [classes, showPassword, toggle]);

  const handleSubmit = useCallback(model => {
    console.debug("[handleSubmit] :: ", { model });
    toast.success("Category added successfully");
  }, []);

  const handleModelChange = useCallback(model => setModel(model), []);
  // ---------------------- /Callbacks ----------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ------------------------ Effects ------------------------ //
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setSchemaDef();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  // ----------------------- /Effects ------------------------ //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h5">My Profile</Typography>
      </Box>

      <Card className={classes.card}>
        {schema ? (
          <AutoForm
            ref={form}
            placeholder
            model={model}
            schema={schema}
            onSubmit={handleSubmit}
            onChangeModel={handleModelChange}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="name" />
                <ErrorField name="name" />
                <AutoField name="email" />
                <ErrorField name="email" />
                <AutoField name="password" />
                <ErrorField name="password" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}></Grid>
            </Grid>

            <Box className={classes.footer}>
              <Button text="Submit" onClick={() => form.current.submit()} />
            </Box>
          </AutoForm>
        ) : null}
      </Card>
    </>
  );
};

export default Profile;
