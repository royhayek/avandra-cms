// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getSchema from "schemas";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { AutoField, AutoForm, ErrorField } from "uniforms-mui";
import { Box, Grid, Typography } from "@mui/material";
import Button from "components/Buttons/Primary";
import BackBtn from "components/Buttons/Back";
import Card from "components/Card";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useFormStyles } from "lib/styles/index.ts";
import useStyles from "./styles.ts";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const Form = () => {
  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const styles = useStyles();
  const formStyles = useFormStyles();
  const classes = { ...styles, ...formStyles };

  const form = useRef();
  const location = useLocation();

  const { state = {} } = location;
  const [schema, setSchema] = useState();
  const [model, setModel] = useState(state ?? {});
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema("addNotificationSchema", {}, {}, {}));
    } catch (err) {
      console.error("Error in [Notification Form - setSchemaDef] :: ", err);
    }
  }, []);

  const handleSubmit = useCallback(model => {
    console.debug("[handleSubmit] :: ", { model });
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

  // --------------------------------------------------------- //
  // ----------------------- Renderers ----------------------- //
  return (
    <>
      <Box className={classes.header}>
        <BackBtn />
        <Typography variant="h5">New Notification</Typography>
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
                <AutoField name="title" />
                <ErrorField name="title" />
                <AutoField name="message" />
                <ErrorField name="message" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="image" />
                <ErrorField name="image" />
              </Grid>
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

export default Form;
