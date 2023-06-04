import _ from "lodash";
import SimpleSchema from "simpl-schema";
import { SimpleSchema2Bridge } from "uniforms-bridge-simple-schema-2";
import * as schemas from './exports';
// import regExpObj from "simpl-schema/dist/regExp";

SimpleSchema.extendOptions(['uniforms']);

const getSchema = (schema_name, classes = {}, state = {}, callback = {}) => {
  // validations go here
  
//   const regExpMessages = [
//     {
//         exp: SimpleSchema.RegEx.Password,
//         msg: "must contain [8 - 14] alphanumeric characters"
//     }
//   ]

  let _schema = _.has(schemas, schema_name)
    ? schemas[schema_name](classes, state, callback)
    : null;

  !_schema && console.error(`[getSchema] :: Missing schema [${schema_name}]`);
  return new SimpleSchema2Bridge(_schema);
};

export default getSchema;
