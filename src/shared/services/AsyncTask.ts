import { KnownErrors } from "./ErrorCodes";
import { KnownError } from "./KnownError";

export interface ErrorDescription {
  code: string,
  message: string
}

export interface GenericResponse {
  success: boolean,
  error?: ErrorDescription
}

export interface AsyncTaskState {
  isInProgress: boolean,
  error?: ErrorDescription
  progress?: number
}

export type AsyncTaskStateChanged = (a: AsyncTaskState) => void

export interface AsyncTaskOptions {
  stateChanged: AsyncTaskStateChanged
}

export abstract class AsyncTask<
  TRequest,
  TResponse extends GenericResponse
> {
  private _stateChanged?: AsyncTaskStateChanged;

  constructor(
    options?: AsyncTaskOptions
  ) {
    this._stateChanged = options?.stateChanged
  }

  protected abstract onWork(
    request: TRequest
  ): Promise<TResponse>;

  async execute(
    request: TRequest
  ): Promise<TResponse> {
    try {
      // Notify that task is stared
      if (this._stateChanged) {
        this._stateChanged({ isInProgress: true })
      }

      const result = await this.onWork(request)

      // Notify
      if (this._stateChanged) {
        this._stateChanged({ isInProgress: false })
      }

      return result
    } catch (error) {
      const errorDescription = {
        code: error instanceof KnownError ? error.code : KnownErrors.UnknownError,
        message: error as string
      }

      // Notify that task is stared
      if (this._stateChanged) {
        this._stateChanged({
          isInProgress: false,
          error: errorDescription
        })
      }

      return {
        success: false,
        error: errorDescription
      } as TResponse
    }
  }
}
