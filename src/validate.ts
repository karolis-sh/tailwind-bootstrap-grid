import Joi from 'joi';

type PluginOptions = {
  gridColumns: number;
  gridGutterWidth: string;
  gridGutters: Record<string, string>;
  generateContainer: boolean;
  containerMaxWidths: Record<string, string>;
  rtl: boolean;
  respectImportant: boolean;
};

export const validate =
  ({ screens }: { screens: Record<string, string> }) =>
  (input: unknown): PluginOptions => {
    const makeScreenSubUnit = (schema: Joi.Schema) =>
      Object.keys(screens).reduce(
        (obj, screen) => ({ [screen]: schema, ...obj }),
        {},
      );

    const { error } = Joi.object({
      gridColumns: Joi.number().integer().min(3).required(),
      gridGutterWidth: Joi.string().required(),
      gridGutters: Joi.object().required(),
      generateContainer: Joi.boolean(),
      containerMaxWidths: Joi.object(
        makeScreenSubUnit(Joi.string()),
      ).required(),
      rtl: Joi.boolean(),
      respectImportant: Joi.boolean(),
    })
      .required()
      .validate(input);
    if (error) {
      throw new Error(
        `tailwind-bootstrap-grid options: \n${JSON.stringify(
          input,
          null,
          2,
        )}\nare invalid: ${error} `,
      );
    }

    return input as PluginOptions;
  };
