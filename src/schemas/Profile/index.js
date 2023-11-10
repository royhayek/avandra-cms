import SimpleSchema from "simpl-schema";
import SchemaHelpers from "../common";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true, useDefaults: true, $data: true });
ajv.addKeyword("uniforms");

export const userProfileSchema = (
  classes = {},
  state = {},
  { show, name, toggle, ...calback }
) => {
  try {
    return new SimpleSchema({
      name: SchemaHelpers.text(
        classes,
        {
          label: "Username",
          optional: false,
        },
        {}
      ),
      email: SchemaHelpers.text(
        classes,
        { label: "Email", optional: false },
        {}
      ),
      password: SchemaHelpers.password(
        classes,
        { label: "Password", optional: false },
        { show, name, toggle }
      ),
    });
  } catch (err) {
    console.debug("SCHEMA ERROR ::: ", err);
  }
};
