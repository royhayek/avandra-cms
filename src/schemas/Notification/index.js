import SimpleSchema from 'simpl-schema';
import SchemaHelpers from '../common';

export const addNotificationSchema = (classes = {}) => {
  try {
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
      title: SchemaHelpers.text(
        classes,
        {
          label: 'Title',
          optional: false
        },
        {}
      ),
      message: SchemaHelpers.text(
        classes,
        { label: 'Message', optional: false },
        {
          multiline: true,
          rows: 7
        }
      )
    });
  } catch (err) {
    console.debug('SCHEMA ERROR ::: ', err);
  }
};
