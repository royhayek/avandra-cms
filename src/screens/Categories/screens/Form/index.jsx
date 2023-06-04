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
import Card from "components/Card";
import Button from "components/Buttons/Primary";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useCommonStyles, useFormStyles } from "lib/styles";
import useStyles from "./styles";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //

const Form = () => {
// --------------------------------------------------------- //
// ------------------------ Static ------------------------- //
  const styles = useStyles();
  const formStyles = useFormStyles();
  const commonStyles = useCommonStyles();
  const classes = { ...styles, ...formStyles, ...commonStyles };

  const form = useRef();
  const history = useHistory();
  const location = useLocation();

  const { state = {} } = location;
  const [schema, setSchema] = useState();
  const [model, setModel] = useState(state ?? {});
// ----------------------- /Static ------------------------- //
// --------------------------------------------------------- //

  console.debug("[model] :: ", { model });

  //----------------------------------------------------//
  //-------------------- CALLBACKS ---------------------//
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema("addCategorySchema", {}, {}, {}));
    } catch (err) {
      console.error("Error in [User Form - setSchemaDef] :: ", err);
    }
  }, []);

  const handleSubmit = useCallback((model) => {
    console.debug("[handleSubmit] :: ", { model });
    toast.success("Category added successfully");
  }, []);

  const handleModelChange = useCallback((model) => setModel(model), []);
// ---------------------- /Callbacks ----------------------- //
// --------------------------------------------------------- //

  //----------------------------------------------------//
  //-------------------- /EFFECTS ----------------------//
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setSchemaDef();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  //-------------------- /EFFECTS ----------------------//
  //----------------------------------------------------//

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
            onChangeModel={handleModelChange}
          >
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <AutoField name="title" />
                <ErrorField name="title" />
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
              <Button text="Submit" onClick={() => form.current.submit()} />
            </Box>
          </AutoForm>
        ) : null}
      </Card>
    </>
  );
};

export default Form;
