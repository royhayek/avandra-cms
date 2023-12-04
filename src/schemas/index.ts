// Packages
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';
// import regExpObj from "simpl-schema/dist/regExp";
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

// Utilities
import * as schemas from './exports';

SimpleSchema.extendOptions(['uniforms']);

// Define a type for the 'schemas' object
interface SchemaFunctions {
  [key: string]: (classes: object, state: object, callback: object) => SimpleSchema;
}

const getSchema = (schema_name: string, classes = {}, state = {}, callback = {}) => {
  // validations go here

  //   const regExpMessages = [
  //     {
  //         exp: SimpleSchema.RegEx.Password,
  //         msg: "must contain [8 - 14] alphanumeric characters"
  //     }
  //   ]

  const _schema = _.has(schemas, schema_name)
    ? (schemas as SchemaFunctions)[schema_name](classes, state, callback)
    : null;

  !_schema && console.error(`[getSchema] :: Missing schema [${schema_name}]`);

  return new SimpleSchema2Bridge(_schema);
};

export default getSchema;
