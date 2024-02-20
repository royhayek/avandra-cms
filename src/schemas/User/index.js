// Packages
import Ajv from 'ajv';
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';

// Utilities
import SchemaHelpers from '../common';
import rolesList from 'shared/constants/roles';
import providersList from 'shared/constants/providers';
import { statusesList } from 'shared/constants/statuses';

// Schema

const ajv = new Ajv({ allErrors: true, useDefaults: true, $data: true });
ajv.addKeyword('uniforms');

export const userSchema = (classes = {}, { modify, show }, { toggle }) => {
  try {
    return new SimpleSchema({
      _id: SchemaHelpers.text(classes, { label: 'Id', optional: true }, { disabled: true }),
      name: SchemaHelpers.text(classes, { label: 'Name', optional: false }, {}),
      email: SchemaHelpers.text(classes, { label: 'Email', optional: false }, {}),
      gender: SchemaHelpers.text(classes, { label: 'Gender', optional: false }, {}),
      country: SchemaHelpers.text(classes, { label: 'Country', optional: false }, {}),
      provider: SchemaHelpers.text(
        classes,
        { label: 'Provider', optional: false, defaultValue: 'email' },
        { disabled: true, options: providersList }
      ),
      role: SchemaHelpers.select(
        classes,
        { label: 'Role', optional: false, defaultValue: 'admin' },
        { options: rolesList }
      ),
      enabled: SchemaHelpers.select(
        classes,
        {
          label: 'Status',
          optional: false,
          defaultValue: true
        },
        {
          options: statusesList
        }
      ),

      currentPassword: SchemaHelpers.password(
        classes,
        { label: 'Current Password', optional: true },
        { show: show?.current, name: 'currentPassword', toggle }
      ),
      password: SchemaHelpers.password(
        classes,
        { label: modify ? 'New Password' : 'Password', optional: modify ? true : false },
        { show: show?.new, name: 'password', toggle }
      ),
      confPassword: SchemaHelpers.password(
        classes,
        { label: modify ? 'New Password Confirmation' : 'Password Confirmation', optional: modify ? true : false },
        { show: show?.confirmation, name: 'confPassword', toggle }
      )
    });
  } catch (err) {
    console.debug('SCHEMA ERROR ::: ', err);
  }
};
