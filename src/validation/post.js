import Joi from '@hapi/joi';

const createPhoto = Joi.object({
  caption: Joi.string().min(1).max(266).trim()
    .required(),
});

export default createPhoto;
