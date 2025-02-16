export class ApiResponse<T> {
  timeStamp: Date;
  responseCode?: number;
  responseMessage?: string;
  data: T;
  errors: string[];


  constructor(
    data: T,
    responseCode?: number,
    responseMessage?: string,
    errors: string[] = [],
    timeStamp: Date = new Date()
  ) {
    this.timeStamp = timeStamp;
    this.responseCode = responseCode;
    this.responseMessage = responseMessage;
    this.data = data;
    this.errors = errors;
  }

}