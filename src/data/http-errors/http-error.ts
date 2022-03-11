import { HttpCode } from "./http-codes";

export class HttpError extends Error {
	public readonly status: HttpCode;
	public metadata?: object;

	constructor(status: HttpCode, message: string, metadata?: object) {
		super(message);
		this.status = status;
		this.metadata = metadata;
	}
}
