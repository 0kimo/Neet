/** @format */

import { getModelForClass, modelOptions, prop, Severity } from "@typegoose/typegoose";

export enum ModuleTypes {
	Welcome = "welcome",
	Farewell = "farewell"
}

class MessageOptions {
	@prop({ required: true, unique: true, enum: ModuleTypes })
	module!: string;

	@prop({ maxlength: 4000, default: null })
	content?: string;
}

@modelOptions({ schemaOptions: { timestamps: true }, options: { customName: "Messages", allowMixed: Severity.ALLOW } })
class Messages {
	@prop({ required: true, unique: true })
	guildId!: string;

	@prop({ type: () => [MessageOptions] })
	modules?: MessageOptions[];
}

export default getModelForClass(Messages);
