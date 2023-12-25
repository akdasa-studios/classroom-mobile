// import { AsyncTask, Request, Response } from "@/shared";

// // TODO: Extract to separate repo bcs-sod-protocol
// export interface SignUpRequest
//   extends Request
// {
//   name: string
// }

// export interface SignUpResponse
//   extends Response
// { }

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


// export class SignUpTask
//   extends AsyncTask<
//     SignUpRequest,
//     SignUpResponse
//   >
// {
//   protected async onWork(
//     request: SignUpRequest
//   ): Promise<SignUpResponse> {
//     await sleep(1000);

//     console.log(request);

//     return { }
//   }
// }
