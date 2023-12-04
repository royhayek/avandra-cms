// Packages
import SimpleSchema from 'simpl-schema';

// Utilities
import SchemaHelpers from '../common';

// Schema
export const loginSchema = (classes = {}, { passwordVisible }, { togglePassVisibility }) => {
  try {
    return new SimpleSchema({
      email: SchemaHelpers.text(
        classes,
        {
          label: 'Email',
          optional: false
        },
        {
          placeholder: 'Type your email here'
        }
      ),
      password: SchemaHelpers.password(
        classes,
        {
          label: 'Password',
          optional: false
        },
        {
          show: passwordVisible,
          toggle: togglePassVisibility,
          placeholder: 'Type your password here'
        }
      )
    });
  } catch (err) {
    console.debug('SCHEMA ERROR ::: ', err);
  }
};
