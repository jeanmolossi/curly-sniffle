import log from "debug";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { registerControllers } from "@/main/decorators/controller";
import { HttpError } from "@/data/http-errors/http-error";

export type ControllerGroup = {
	router?: express.Router;
	controllers: object[];
};

export class Application {
	private app: express.Application;
	private controllersGroups: ControllerGroup[];
	private logger: log.Debugger;

	private constructor(controllersGroups: ControllerGroup[]) {
		this.controllersGroups = controllersGroups;
		this.logger = log("api:main:application");
	}

	static register(...controllersGroups: ControllerGroup[]): Application {
		return new Application(controllersGroups);
	}

	async start(): Promise<void> {
		this.logger("Starting application");

		this.app = express();

		this.applyMiddlewares();

		this.applyRoutes();

		this.applyErrorHandler();

		this.app.listen(process.env.PORT || 3000, () =>
			this.logger("Listening on port %d", process.env.PORT || 3000)
		);
	}

	private applyMiddlewares(): void {
		this.app.use(express.json());
		this.app.use(cors());
		this.app.use((request: Request, _: Response, next: NextFunction) => {
			this.logger(
				"Request received: %s %s",
				request.method,
				request.path
			);
			return next();
		});
	}

	private applyRoutes(): void {
		const router = express.Router();

		this.controllersGroups.forEach(({ controllers, router: subRouter }) => {
			subRouter
				? router.use(registerControllers(subRouter, ...controllers))
				: router.use(registerControllers(router, ...controllers));
		});

		router.get("/", (_: Request, response: Response) =>
			response.json({ message: "Health" })
		);

		this.app.use("/api", router);
	}

	private applyErrorHandler() {
		this.app.use(
			(
				err: Error,
				_: Request,
				response: Response,
				next: NextFunction
			) => {
				if (err instanceof HttpError) {
					this.logger("Error: %s", err.message);

					return response.status(err.status).json({
						message: err.message,
						status: err.status,
						metadata: err.metadata,
					});
				} else {
					this.logger("Error instanceof %s", err);
				}

				return next(err);
			}
		);
	}
}
