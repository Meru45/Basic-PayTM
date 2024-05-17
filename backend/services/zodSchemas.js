const zod = require("zod");

const userSignUpSchema = zod.object({
  firstName: zod.string().max(30),
  lastName: zod.string().max(30),
  email: zod.string().email(),
  password: zod.string().min(8),
});

const userSignInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const userUpdateSchema = zod.object({
  firstName: zod.string().max(30).optional(),
  lastName: zod.string().max(30).optional(),
  password: zod.string().min(8).optional(),
});

const transferSchema = zod.object({
  to: zod.string(),
  amount: zod.number(),
});

module.exports = {
  userSignUpSchema,
  userSignInSchema,
  userUpdateSchema,
  transferSchema,
};
