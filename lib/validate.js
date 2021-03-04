const Joi = require('joi');

module.exports = ({ screens }) => (input) => {
  const makeScreenSubUnit = (schema) =>
    Object.keys(screens).reduce((obj, screen) => ({ [screen]: schema, ...obj }), {});

  const { error } = Joi.object({
    gridColumns: Joi.number().integer().min(3).required(),
    gridGutterWidth: Joi.string().required(),
    gridGutterWidths: Joi.alternatives()
      .try(Joi.object(makeScreenSubUnit(Joi.string().required())), Joi.object({}))
      .required(),
    generateContainer: Joi.boolean(),
    generateNoGutters: Joi.boolean(),
    containerMaxWidths: Joi.object(makeScreenSubUnit(Joi.string())).required(),
    rtl: Joi.boolean(),
    respectImportant: Joi.boolean(),
  })
    .required()
    .validate(input);
  if (error) {
    throw new Error(
      `tailwind-bootstrap-grid options: \n${JSON.stringify(input, null, 2)}\nare invalid: ${error} `
    );
  }
  return input;
};
