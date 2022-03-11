import { HttpCode } from "@/data/http-errors/http-codes";
import { HttpError } from "@/data/http-errors/http-error";
import { LABEL_WATERMARK } from "@/domain";

export class EntityAlreadyExistsError extends HttpError {
	constructor(entity: object) {
		const label =
			Reflect.getOwnMetadata(LABEL_WATERMARK, entity) || "Entity";

		super(HttpCode.BAD_REQUEST, label + " already exists");
	}
}
