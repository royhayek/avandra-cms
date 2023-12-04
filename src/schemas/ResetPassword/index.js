// Packages
import SimpleSchema from 'simpl-schema';

// Utilities
import SchemaHelpers from '../common';

// Schema

export const resetPassSchema = (classes = {}) => {
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
      )
    });
  } catch (err) {
    console.debug('SCHEMA ERROR ::: ', err);
  }
};
