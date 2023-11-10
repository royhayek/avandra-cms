// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import getSchema from "schemas";
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { AutoField, AutoForm, ErrorField } from "uniforms-mui";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Button from "components/Buttons/Primary";
import Card from "components/Card";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useCommonStyles, useFormStyles } from "lib/styles/index.ts";
import * as api from "redux/category/api";
import useStyles from "./styles.ts";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const Form = () => {
  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const styles = useStyles();
  const formStyles = useFormStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...commonStyles, ...formStyles, ...styles };

  const form = useRef();
  const history = useHistory();
  const location = useLocation();

  const { state = {} } = location;
  const [schema, setSchema] = useState(false);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(state ?? {});
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema("addCategorySchema", {}, {}, {}));
    } catch (err) {
      console.error("Error in [User Form - setSchemaDef] :: ", err);
    }
  }, []);

  const handleSubmit = useCallback(model => {
    console.debug("[handleSubmit] :: ", { model });

    setLoading(true);
    api
      .createCategory(model)
      .then(() => toast.success("Category created successfully"))
      .finally(() => setLoading(false));
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
        <IconButton onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">New Category</Typography>
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
                <AutoField name="description" />
                <ErrorField name="description" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="image" />
                <ErrorField name="image" />
                <AutoField name="status" />
                <ErrorField name="status" />
              </Grid>
            </Grid>

            <Box className={classes.footer}>
              <Button text="Submit" onClick={() => form.current.submit()} disabled={loading} />
            </Box>
          </AutoForm>
        ) : null}
      </Card>
    </>
  );
};

export default Form;
