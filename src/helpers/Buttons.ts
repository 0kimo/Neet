/** @format */

import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { createKey } from "../lib";
import { IComponentArg } from "../lib/types";

function MessageBuilderCreateKey(type: string, module: string): string {
	return createKey<IComponentArg>(`settings-message-${module}:${type}`, {
		customId: "settings/message",
		type,
		module
	});
}

export function createCollectorButton(customId: string) {
	return createKey<IComponentArg>(customId, {
		customId: "-collector"
	});
}

export function createMessageBuilderButtons(module: string): ActionRowBuilder<ButtonBuilder> {
	return new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder()
			.setCustomId(MessageBuilderCreateKey("content", module))
			.setLabel("Content")
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(MessageBuilderCreateKey("author", module))
			.setLabel("Embed Author")
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(MessageBuilderCreateKey("body", module))
			.setLabel("Embed Body")
			.setStyle(ButtonStyle.Primary),
		new ButtonBuilder()
			.setCustomId(MessageBuilderCreateKey("footer", module))
			.setLabel("Embed Footer")
			.setStyle(ButtonStyle.Primary)
	);
}
