import { ZodError } from 'zod'
import { loginSchema } from '.'

describe('LIBS_AUTHENTICATION', () => {
  it('LOGIN_SCHEMA_AS_EXPECTED', () => {
    const dataRequest = {
      phoneNumber: '0919000000',
      pin: '1234',
    }
    const parsedRequest = loginSchema.parse(dataRequest)
    expect(parsedRequest).toMatchObject({
      phoneNumber: '0919000000',
      pin: '1234',
    })
  })
  it('LOGIN_SCHEMA_ALL_EMPTY', () => {
    const dataRequest = {}
    const wrappedValidation = () => loginSchema.parse(dataRequest)
    expect(wrappedValidation).toThrowError(
      new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['phoneNumber'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['pin'],
          message: 'Required',
        },
      ])
    )
  })
  it('LOGIN_SCHEMA_EMPTY_PHONE', () => {
    const dataRequest = { pin: '1234' }
    const wrappedValidation = () => loginSchema.parse(dataRequest)
    expect(wrappedValidation).toThrowError(
      new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['phoneNumber'],
          message: 'Required',
        },
      ])
    )
  })
  it('LOGIN_SCHEMA_EMPTY_PIN', () => {
    const dataRequest = { phoneNumber: '0919000000' }
    const wrappedValidation = () => loginSchema.parse(dataRequest)
    expect(wrappedValidation).toThrowError(
      new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['pin'],
          message: 'Required',
        },
      ])
    )
  })
  it('LOGIN_SCHEMA_WRONG_PHONE', () => {
    const dataRequest = { phoneNumber: '091900', pin: '1234' }
    const wrappedValidation = () => loginSchema.parse(dataRequest)
    expect(wrappedValidation).toThrowError(
      new ZodError([
        {
          validation: 'regex',
          code: 'invalid_string',
          message: 'Invalid',
          path: ['phoneNumber'],
        },
      ])
    )
  })
  it('LOGIN_SCHEMA_INVALID_PIN_SIZE', () => {
    const dataRequest = { phoneNumber: '0919000000', pin: '12' }
    const wrappedValidation = () => loginSchema.parse(dataRequest)
    expect(wrappedValidation).toThrowError(
      new ZodError([
        {
          code: 'too_small',
          minimum: 4,
          type: 'string',
          inclusive: true,
          message: 'String must contain at least 4 character(s)',
          path: ['pin'],
        },
      ])
    )
  })
})
