import SimpleSchema from "simpl-schema";
import SchemaHelpers from "../common";

export const loginSchema = (classes = {}, state = {}, callback = {}) => {
  try {
    return new SimpleSchema({
      email: SchemaHelpers.text(
        classes,
        {
          label: "Email",
          optional: false,
        },
        {
          placeholder: "Type your email here",
        }
      ),
      password: SchemaHelpers.password(
        classes,
        {
          label: "Password",
          optional: false,
        },
        {
          placeholder: "Type your password here",
        }
      ),
    });
  } catch (err) {
    console.debug("SCHEMA ERROR ::: ", err);
  }
};
