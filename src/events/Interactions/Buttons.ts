/** @format */

import { ButtonInteraction, Events } from "discord.js";
import { Bot, getFromKey } from "../../lib";
import { IComponentArg } from "../../lib/types";

export default {
	name: Events.InteractionCreate,
	once: false,
	run: async (interaction: ButtonInteraction) => {
		if (!interaction.isButton()) return;
		const customInfo = getFromKey<IComponentArg>(interaction.customId);

		if (!customInfo) {
			Bot.warn(`Cannot find (${interaction.customId}) in store.`);
			return;
		}

		// Don't handle this interaction in this event.
		if (customInfo.customId === "-collector") return;

		try {
			(await import(`../../context/buttons/${customInfo.customId}`)).run(interaction, customInfo);
		} catch (error) {
			Bot.error(error);
		}
	}
};
