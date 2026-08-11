import { NextResponse } from "next/server"
import * as yup from "yup"

/**
 * Validates and coerces a request body against a yup schema.
 *
 * Throws a ready-to-return NextResponse on failure, so routes read as:
 *
 *   let body: yup.InferType<typeof schema>
 *   try {
 *     body = await validateBody(rawBody, schema)
 *   } catch (errorResponse) {
 *     return errorResponse as NextResponse
 *   }
 *
 * `stripUnknown` matters: it drops fields the client invented, so a caller
 * cannot smuggle `is_published` or `view_count` into an insert.
 */
export async function validateBody<TSchema extends yup.AnySchema>(
  body: unknown,
  schema: TSchema,
): Promise<yup.InferType<TSchema>> {
  try {
    return (await schema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    })) as yup.InferType<TSchema>
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw NextResponse.json(
        {
          message: "Validation failed",
          errors: error.inner.length
            ? error.inner.map((e) => ({
                field: e.path ?? null,
                message: e.message,
              }))
            : [{ field: error.path ?? null, message: error.message }],
        },
        { status: 400 },
      )
    }

    throw NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    )
  }
}
