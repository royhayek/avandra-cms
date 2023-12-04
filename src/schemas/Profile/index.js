// Packages
import Ajv from 'ajv';
import SimpleSchema from 'simpl-schema';

// Utilities
import SchemaHelpers from '../common';

// Schema

const ajv = new Ajv({ allErrors: true, useDefaults: true, $data: true });
ajv.addKeyword('uniforms');

export const userProfileSchema = (classes = {}, { show }, { toggle }) => {
  try {
    return new SimpleSchema({
      name: SchemaHelpers.text(classes, { label: 'Name', optional: false }, {}),
      email: SchemaHelpers.text(classes, { label: 'Email', optional: false }, {}),
      currentPassword: SchemaHelpers.password(
        classes,
        { label: 'Current Password', optional: true },
        { show: show.current, name: 'currentPassword', toggle }
      ),
      password: SchemaHelpers.password(
        classes,
        { label: 'New Password', optional: true },
        { show: show.new, name: 'password', toggle }
      ),
      confPassword: SchemaHelpers.password(
        classes,
        { label: 'Confirm New Password', optional: true },
        { show: show.confirmation, name: 'confPassword', toggle }
      )
    });
  } catch (err) {
    console.debug('SCHEMA ERROR ::: ', err);
  }
};
