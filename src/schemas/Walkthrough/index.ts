// Packages
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';

// Utilities
import SchemaHelpers from '../common';

// Schema

export const walkthroughSchema = (classes = {}, { languages, defaultLang }) => {
  const config = {
    languages: _.map(languages, (lang) => ({ label: lang.label, value: lang._id }))
  };

  try {
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
      image: SchemaHelpers.image(
        classes,
        {
          label: 'Image',
          optional: false,
          defaultValue: null
        },
        {
          path: 'walkthrough/image'
        }
      ),
      title: SchemaHelpers.text(
        classes,
        {
          label: 'Title',
          optional: false
        },
        {}
      ),
      description: SchemaHelpers.text(
        classes,
        { label: 'Description', optional: false },
        {
          rows: 4,
          InputProps: { multiline: true, disableUnderline: true }
        }
      )
    });
  } catch (err) {
    console.debug('SCHEMA ERROR ::: ', err);
  }
};
