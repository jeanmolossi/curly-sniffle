import { Router } from "express";

const CONTROLLER = "__controller__";
const PATH_METADATA = "__path__";
const METHOD_METADATA = "__method__";

export function Controller(path: string): ClassDecorator {
	return (constructor: object) => {
		const root = "/";
		Reflect.defineMetadata(CONTROLLER, true, constructor);
		Reflect.defineMetadata(PATH_METADATA, path || root, constructor);
	};
}

export const RequestMapping = (path = "/", method = "GET"): MethodDecorator => {
	return (
		target: object,
		key: string | symbol,
		descriptor: PropertyDescriptor
	) => {
		Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
		Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
	};
};

export const createMethodDecorator =
	(method = "GET") =>
	(path = "/"): MethodDecorator => {
		return RequestMapping(path, method);
	};

export const Get = createMethodDecorator("GET");
export const Post = createMethodDecorator("POST");
export const Put = createMethodDecorator("PUT");
export const Delete = createMethodDecorator("DELETE");
export const Patch = createMethodDecorator("PATCH");

export function registerControllers(router: Router, ...controllers: object[]) {
	controllers.forEach((controller) => {
		const proto = Object.getPrototypeOf(controller);

		const controllerPath = Reflect.getOwnMetadata(
			PATH_METADATA,
			proto.constructor
		);

		Object.getOwnPropertyNames(proto)
			.filter((c) => c !== "constructor")
			.forEach((methodName) => {
				const method = methodName as keyof typeof proto;

				const call = proto[method];

				const methodPath = Reflect.getMetadata(PATH_METADATA, call);
				const methodMethod = Reflect.getMetadata(METHOD_METADATA, call);

				const finalRoute = `${controllerPath}${methodPath}`;

				switch (methodMethod) {
					case "POST":
						router.post(finalRoute, call.bind(controller));
						break;
					case "PUT":
						router.put(finalRoute, call.bind(controller));
						break;
					case "PATCH":
						router.put(finalRoute, call.bind(controller));
						break;
					case "DELETE":
						router.delete(finalRoute, call.bind(controller));
						break;
					case "GET":
					default:
						router.get(finalRoute, call.bind(controller));
						break;
				}
			});
	});

	return router;
}
