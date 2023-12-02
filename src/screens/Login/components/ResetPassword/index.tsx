// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BaseForm, BaseFormProps, BaseFormState, Bridge } from 'uniforms';
import { toast } from 'react-toastify';
import { DeepPartial } from 'redux';
import classNames from 'classnames';
// ------------------------------------------------------------ //
// ------------------------ Components ------------------------ //
// ------------------------------------------------------------ //
import { AutoField, AutoForm, ErrorField } from 'uniforms-mui';
import RegularButton from 'shared/components/Buttons/Primary';
import { Box, Typography } from '@mui/material';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import { useCommonStyles, useFormStyles } from 'shared/assets/styles';
import useStyles from './styles.ts';
import getSchema from 'schemas';
//----------------------------------------------------//
//------------------- COMPONENT ----------------------//
//----------------------------------------------------//
interface ResetPasswordProps {
  toggle: () => void;
}

interface ResetPasswordForm {
  email: string;
}

const ResetPassword = ({ toggle }: ResetPasswordProps) => {
  // --------------------------------------------------------- //
  // ----------------------- Statics ------------------------- //
  const form = useRef<BaseForm<
    DeepPartial<ResetPasswordForm>,
    BaseFormProps<DeepPartial<ResetPasswordForm>>,
    BaseFormState<DeepPartial<ResetPasswordForm>>
  > | null>(null);

  const styles = useStyles();
  const formStyles = useFormStyles();
  const commonStyles = useCommonStyles();
  const classes = useMemo(() => ({ ...styles, ...formStyles, ...commonStyles }), [commonStyles, formStyles, styles]);

  const [schema, setSchema] = useState<Bridge>();
  // ---------------------- /Statics ------------------------- //
  // --------------------------------------------------------- //

  // --------------------------------------------------------- //
  // ----------------------- Callbacks ----------------------- //
  const setSchemaDef = useCallback(() => {
    try {
      setSchema(getSchema('resetPassSchema', {}, {}, {}));
    } catch (err) {
      console.error('Error in [ResetPassword - setSchemaDef] :: ', err);
    }
  }, []);

  const handleSubmit = useCallback((model) => {
    console.debug('[handleSubmit] :: ', { model });
    toast.success('Reset request sent successfully');
  }, []);
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
    []
  );

  const renderFooter = useMemo(
    () => (
      <Box className={classNames(classes.row, 'flexEnd gap')}>
        <RegularButton variant="outlined" text="Cancel" onClick={toggle} />
        <RegularButton text="Reset" onClick={() => form.current?.submit()} />
      </Box>
    ),
    [classes.row, toggle]
  );

  const renderForm = useMemo(
    () =>
      schema ? (
        <AutoForm ref={form} placeholder schema={schema} onSubmit={handleSubmit}>
          <AutoField name="email" />
          <ErrorField name="email" />
        </AutoForm>
      ) : null,
    [handleSubmit, schema]
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
