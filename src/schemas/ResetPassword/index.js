import SimpleSchema from 'simpl-schema';
import SchemaHelpers from '../common';

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
