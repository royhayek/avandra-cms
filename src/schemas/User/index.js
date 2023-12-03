import Ajv from 'ajv';
import _ from 'lodash';
import SchemaHelpers from '../common';
import SimpleSchema from 'simpl-schema';
import rolesList from 'shared/constants/roles';
import providersList from 'shared/constants/providers';
import { statusesList } from 'shared/constants/statuses';

const ajv = new Ajv({ allErrors: true, useDefaults: true, $data: true });
ajv.addKeyword('uniforms');

export const editUserSchema = (classes = {}, { show }, { toggle }) => {
  try {
    return new SimpleSchema({
      _id: SchemaHelpers.text(classes, { label: 'Id', optional: false }, { disabled: true }),
      name: SchemaHelpers.text(classes, { label: 'Name', optional: false }, {}),
      email: SchemaHelpers.text(classes, { label: 'Email', optional: false }, {}),
      provider: SchemaHelpers.text(
        classes,
        { label: 'Provider', optional: false },
        { disabled: true, options: providersList }
      ),
      role: SchemaHelpers.select(classes, { label: 'Role', optional: false }, { options: rolesList }),
      status: SchemaHelpers.select(
        classes,
        {
          label: 'Status',
          optional: false,
          defaultValue: 1
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
        { label: 'New Password', optional: true },
        { show: show?.new, name: 'password', toggle }
      ),
      confPassword: SchemaHelpers.password(
        classes,
        { label: 'Confirm New Password', optional: true },
        { show: show?.confirmation, name: 'confPassword', toggle }
      )
    });
  } catch (err) {
    console.debug('SCHEMA ERROR ::: ', err);
  }
};
