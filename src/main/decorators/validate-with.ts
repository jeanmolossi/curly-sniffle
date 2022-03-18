import { Request, Response } from "express";
import { Validate } from "../validators";

export function ValidateInputWith(validator: Validate): MethodDecorator {
	return (
		target: object,
		key: string | symbol,
		descriptor: PropertyDescriptor
	) => {
		const original = descriptor.value;

		descriptor.value = function (
			request: Request,
			response: Response,
			...args: any[]
		) {
			validator.validate(request, response);
			return original.apply(this, [request, response, ...args]);
		};

		return descriptor;
	};
}
