import { KnownErrors } from "./ErrorCodes";

/**
 * Represents a known error.
 */
export class KnownError extends Error {
  private _code: KnownErrors;

  /**
   * Creates a new instance of the KnownError class.
   * @param code The known error code.
   * @param message An optional error message.
   */
  constructor(code: KnownErrors, message?: string) {
    super(message);
    this._code = code;
  }

  /**
   * Gets the error code.
   * @returns The error code.
   */
  public get code(): KnownErrors {
    return this._code;
  }
}
