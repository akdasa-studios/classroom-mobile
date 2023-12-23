import { AsyncTask, ErrorDescription, KnownError, KnownErrors } from "@/shared";

// TODO: Extract success, error to HasOperationResult interface
// TODO: Extract to separate repo bcs-sod-protocol
export interface RequestSignInCode {
  email: string
}

export interface RequestSignInCodeResponse {
  success: boolean
  error?: ErrorDescription
}

export interface SignInRequest {
  code: string
}

export interface SignInResponse {
  success: boolean,
  error?: ErrorDescription
}


const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


export class RequestSignInCodeTask
  extends AsyncTask<
    RequestSignInCode,
    RequestSignInCodeResponse
  >
{
  protected async onWork(
    request: RequestSignInCode
  ): Promise<RequestSignInCodeResponse> {
    await sleep(1000);

    if (request.email != "test") {
      throw new KnownError(KnownErrors.InvalidEmail)
    }

    return {
      success: true,
    }
  }
}

export class SignInTask
  extends AsyncTask<
    SignInRequest,
    SignInResponse
  > {
  protected async onWork(
    request: SignInRequest
  ): Promise<SignInResponse> {
    await sleep(1000);

    if (request.code != "1234") {
      throw new KnownError(KnownErrors.InvalidSignInCode)
    }

    return {
      success: true
    }
  }
}

export class SignInService {
  private _requestSignInCodeAction = new RequestSignInCodeTask()
  private _signInAction = new SignInTask()

  get requestSignInCode() { return this._requestSignInCodeAction }
  get signIn() { return this._signInAction }
}