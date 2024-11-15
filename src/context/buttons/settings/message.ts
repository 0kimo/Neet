/** @format */

import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { IComponentArg } from "../../../lib/types";
import { createKey } from "../../../lib";

interface ExpectedArgType extends IComponentArg {
	type: string;
	module: string;
}

export async function run(interaction: ButtonInteraction, args: ExpectedArgType) {
	const modalId = createKey<IComponentArg>("message-customize-modal", {
		customId: "message"
	});

	const modal = new ModalBuilder().setCustomId(modalId).setTitle("Customize Message");

	if (args.type === "content") {
		modal.addComponents(
			new ActionRowBuilder<TextInputBuilder>().setComponents(
				new TextInputBuilder()
					.setCustomId("content-field")
					.setStyle(TextInputStyle.Paragraph)
					.setLabel("Content")
					.setRequired(true)
			)
		);
	}

	if (args.type === "author") {
		modal.addComponents(
			new ActionRowBuilder<TextInputBuilder>().setComponents(
				new TextInputBuilder()
					.setCustomId("author-name")
					.setStyle(TextInputStyle.Short)
					.setLabel("Author Name")
					.setRequired(true)
			),

			new ActionRowBuilder<TextInputBuilder>().setComponents(
				new TextInputBuilder()
					.setCustomId("author-icon")
					.setStyle(TextInputStyle.Short)
					.setLabel("Author Icon")
					.setRequired(false)
			)
		);
	}

	if (args.type === "body") {
		modal.addComponents(
			new ActionRowBuilder<TextInputBuilder>().setComponents(
				new TextInputBuilder()
					.setCustomId("body-title")
					.setStyle(TextInputStyle.Short)
					.setLabel("Title")
					.setRequired(false)
			),

			new ActionRowBuilder<TextInputBuilder>().setComponents(
				new TextInputBuilder()
					.setCustomId("body-description")
					.setStyle(TextInputStyle.Short)
					.setLabel("Description")
					.setRequired(false)
			)
		);
	}

	await interaction.showModal(modal);
}
