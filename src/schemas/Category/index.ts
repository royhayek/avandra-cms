import { statusesList } from 'shared/constants/statuses';
import SimpleSchema from 'simpl-schema';
import SchemaHelpers from '../common';
import _ from 'lodash';

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
