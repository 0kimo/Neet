/** @format */

import { getModelForClass, Severity, prop, modelOptions } from "@typegoose/typegoose";

class AnyGreeting {
	@prop({ default: false })
	public enabled?: boolean;

	@prop({ default: null })
	public channelId?: string;

	@prop({ default: false })
	public customMessage?: boolean;
}

@modelOptions({ schemaOptions: { timestamps: true }, options: { customName: "Settings", allowMixed: Severity.ALLOW } })
class Settings {
	@prop({ required: true, unique: true })
	public guildId!: string;

	public updatedAt?: Date;
	public createdAt?: Date;

	@prop()
	welcome?: AnyGreeting;

	@prop()
	farewell?: AnyGreeting;
}

export default getModelForClass(Settings);

export enum GreetingPrefix {
	Welcome = "welcome",
	Farewell = "farewell"
}
