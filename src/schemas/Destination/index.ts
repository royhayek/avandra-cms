// Packages
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';

// Utilities
import SchemaHelpers from '../common';
import { statusesList } from 'shared/constants/statuses';

// Schema

export const destinationSchema = (classes = {}, { languages, defaultLang }) => {
  try {
    const config = {
      languages: _.map(languages, (lang) => ({ label: lang.label, value: lang._id })),
      statusesList: _.map(statusesList, ({ value, label }) => ({
        value,
        label
      }))
    };

    return new SimpleSchema({
      language: SchemaHelpers.select(
        classes,
        {
          label: 'Language',
          optional: false,
          defaultValue: _.find(languages, { value: defaultLang })?._id
        },
        {
          options: config.languages
        }
      ),
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
      description: SchemaHelpers.text(
        classes,
        { label: 'Description', optional: false },
        {
          rows: 5,
          InputProps: { multiline: true, disableUnderline: true }
        }
      ),
      country: SchemaHelpers.text(classes, { label: 'Country', optional: false }, {}),
      bestTime: SchemaHelpers.text(classes, { label: 'Best Time to Go', optional: false }, {}),
      spokenLang: SchemaHelpers.text(classes, { label: 'Language(s)', optional: false }, {}),
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
