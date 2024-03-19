export type ServerResponseType<DataType> = {
  data: DataType;
  error: unknown;
  message: string;
  ok: boolean;
};
