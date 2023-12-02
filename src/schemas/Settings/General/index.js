import SimpleSchema from 'simpl-schema';
import SchemaHelpers from '../../common';
import _ from 'lodash';
import { statusesList } from 'shared/constants/statuses';

export const generalSettingsSchema = (classes = {}) => {
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
          optional: false,
          defaultValue: null
        },
        {}
      ),
      siteName: SchemaHelpers.text(
        classes,
        {
          label: 'Site Name',
          optional: false
        },
        {}
      ),
      siteTitle: SchemaHelpers.text(
        classes,
        {
          label: 'Site Title',
          optional: false
        },
        {}
      ),
      emailAddress: SchemaHelpers.text(
        classes,
        {
          label: 'E-mail Address',
          optional: false
        },
        {}
      ),
      seoKeywords: SchemaHelpers.text(
        classes,
        {
          label: 'SEO Keywords',
          optional: false
        },
        {}
      ),
      siteDescription: SchemaHelpers.text(
        classes,
        {
          label: 'Site Description',
          optional: false
        },
        {
          multiline: true,
          rows: 4
        }
      ),
      status: SchemaHelpers.select(
        classes,
        { label: 'Status', optional: false, defaultValue: 1 },
        {
          options: config.statusesList
        }
      ),

      smtpUsername: SchemaHelpers.text(
        classes,
        {
          label: 'SMTP Username',
          optional: true
        },
        {}
      ),
      smtpPassword: SchemaHelpers.text(
        classes,
        {
          label: 'SMTP Password',
          optional: true
        },
        {}
      ),
      smtpServer: SchemaHelpers.text(
        classes,
        {
          label: 'SMTP Server',
          optional: true
        },
        {}
      ),
      smtpHost: SchemaHelpers.text(
        classes,
        {
          label: 'SMTP Host',
          optional: true
        },
        {}
      ),
      smtpEncryption: SchemaHelpers.text(
        classes,
        {
          label: 'SMTP Encryption',
          optional: true
        },
        {}
      ),
      smtpPort: SchemaHelpers.text(
        classes,
        {
          label: 'SMTP Port',
          optional: true
        },
        {}
      ),

      fbApiId: SchemaHelpers.text(
        classes,
        {
          label: 'Facebook API ID',
          optional: true
        },
        {}
      ),
      fbApiKey: SchemaHelpers.text(
        classes,
        {
          label: 'Facebook API Key',
          optional: true
        },
        {}
      ),
      fbApiStatus: SchemaHelpers.select(
        classes,
        { label: 'Facebook Status', optional: false, defaultValue: 1 },
        {
          options: config.statusesList
        }
      ),
      googleApiId: SchemaHelpers.text(
        classes,
        {
          label: 'Google API ID',
          optional: true
        },
        {}
      ),
      googleApiKey: SchemaHelpers.text(
        classes,
        {
          label: 'Google API Key',
          optional: true
        },
        {}
      ),
      googleApiStatus: SchemaHelpers.select(
        classes,
        { label: 'Google Status', optional: false, defaultValue: 1 },
        {
          options: config.statusesList
        }
      ),
      appleApiId: SchemaHelpers.text(
        classes,
        {
          label: 'Apple API ID',
          optional: true
        },
        {}
      ),
      appleApiKey: SchemaHelpers.text(
        classes,
        {
          label: 'Apple API Key',
          optional: true
        },
        {}
      ),
      appleApiStatus: SchemaHelpers.select(
        classes,
        { label: 'Apple Status', optional: false, defaultValue: 1 },
        {
          options: config.statusesList
        }
      ),

      fcmKey: SchemaHelpers.text(
        classes,
        {
          label: 'FCM Key',
          optional: true
        },
        {}
      )
    });
  } catch (err) {
    console.debug('SCHEMA ERROR ::: ', err);
  }
};
