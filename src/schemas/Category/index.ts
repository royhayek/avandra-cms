// Packages
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';

// Utilities
import SchemaHelpers from '../common';
import { statusesList } from 'shared/constants/statuses';

// Schema

export const addCategorySchema = (classes = {}) => {
  try {
    const config = {
      statusesList: _.map(statusesList, ({ value, label }) => ({
        value,
        label
      }))
    };

    return new SimpleSchema({
      image: SchemaHelpers.image(
        classes,
        {
          label: 'Image',
          optional: true,
          defaultValue: null
        },
        {}
      ),
      name: SchemaHelpers.text(
        classes,
        {
          label: 'Name',
          optional: false
        },
        {}
      ),
      description: SchemaHelpers.text(
        classes,
        { label: 'Description', optional: false },
        {
          multiline: true,
          rows: 7
        }
      ),
      status: SchemaHelpers.select(
        classes,
        { label: 'Status', optional: false, defaultValue: 1 },
        {
          options: config.statusesList
        }
      )
    });
  } catch (err) {
    console.debug('SCHEMA ERROR ::: ', err);
  }
};
