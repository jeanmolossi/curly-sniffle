export const LABEL_WATERMARK = "__label__";

export function EntityLabel(label: string): ClassDecorator {
	return (constructor: object) => {
		Reflect.defineMetadata(LABEL_WATERMARK, label, constructor);
	};
}
