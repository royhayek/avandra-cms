// Packages
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';

// Utilities
import SchemaHelpers from '../common';
import { statusesList } from 'shared/constants/statuses';

// Schema

export const interestSchema = (classes = {}, { languages, defaultLang }) => {
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
      icon: SchemaHelpers.text(classes, { label: 'Icon', optional: false }, {}),
      title: SchemaHelpers.text(classes, { label: 'Title', optional: false }, {}),
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
