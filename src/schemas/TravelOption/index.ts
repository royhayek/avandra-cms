// Packages
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';

// Utilities
import SchemaHelpers from '../common';
import { statusesList } from 'shared/constants/statuses';

// Schema

export const travelOptionSchema = (classes = {}) => {
  try {
    const config = {
      statusesList: _.map(statusesList, ({ value, label }) => ({
        value,
        label
      }))
    };

    return new SimpleSchema({
      icon: SchemaHelpers.text(classes, { label: 'Icon', optional: false }, {}),
      title: SchemaHelpers.text(classes, { label: 'Title', optional: false }, {}),
      description: SchemaHelpers.text(classes, { label: 'Description', optional: false }, {}),
      enabled: SchemaHelpers.select(
        classes,
        { label: 'Status', optional: false, defaultValue: true },
        {
          options: config.statusesList
        }
      )
    });
  } catch (err) {
    console.debug('SCHEMA ERROR ::: ', err);
  }
};
