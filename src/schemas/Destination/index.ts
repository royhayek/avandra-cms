// Packages
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';

// Utilities
import SchemaHelpers from '../common';
import { statusesList } from 'shared/constants/statuses';

// Schema

export const destinationSchema = (classes = {}) => {
  try {
    const config = {
      statusesList: _.map(statusesList, ({ value, label }) => ({
        value,
        label
      }))
    };

    return new SimpleSchema({
      flag: SchemaHelpers.image(
        classes,
        {
          label: 'Flag',
          optional: false,
          defaultValue: null
        },
        {
          size: 'small',
          path: 'destination/flag'
        }
      ),
      image: SchemaHelpers.image(
        classes,
        {
          label: 'Image',
          optional: false,
          defaultValue: null
        },
        {
          path: 'destination/image'
        }
      ),
      gallery: SchemaHelpers.image(
        classes,
        {
          label: 'Gallery',
          optional: false,
          defaultValue: null
        },
        {
          multiple: true,
          path: 'destination/gallery'
        }
      ),
      name: SchemaHelpers.text(
        classes,
        {
          label: 'Name',
          optional: false
        },
        {}
      ),
      country: SchemaHelpers.text(classes, { label: 'Country', optional: false }, {}),
      continent: SchemaHelpers.text(classes, { label: 'Continent', optional: false }, {}),
      currency: SchemaHelpers.text(classes, { label: 'Currency', optional: false }, {}),
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
