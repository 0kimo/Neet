/** @format */

import { channelMention, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import Settings from "../../../typegoose/Settings";
import { undefinedDatabase } from "../../../helpers/Embeds";
import moment from "moment";

export async function run(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply({ ephemeral: true });
	const data = await Settings.findOne({ guildId: interaction.guildId });

	if (!data) {
		(await Settings.create({ guildId: interaction.guildId })).save();
		return interaction.editReply({ embeds: [undefinedDatabase()] });
	}

	console.log(data);

	const greetingsWelcome = {
		status: data.welcome?.enabled ? "Enabled" : "Disabled",
		channelId: data.welcome?.channelId ? channelMention(data.welcome.channelId) : "None"
	};

	const greetingsFarewell = {
		status: data.farewell?.enabled ? "Enabled" : "Disabled",
		channelId: data.farewell?.channelId ? channelMention(data.farewell.channelId) : "None"
	};

	const lastUpdated = moment(data.updatedAt).format("DD/MM/YYYY hh:mm:ss");
	const createdDate = moment(data.createdAt).format("DD/MM/YYYY hh:mm:ss");

	const embed = new EmbedBuilder()
		.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
		.setTitle(":white_check_mark: | Settings")
		.setDescription(`**»** Created: ${createdDate}\n**»** Last Updated: ${lastUpdated}`)
		.addFields(
			{
				name: "»» Welcome",
				value: `${greetingsWelcome.status} - ${greetingsWelcome.channelId}`
			},
			{
				name: "»» Farewell",
				value: `${greetingsFarewell.status} - ${greetingsFarewell.channelId}`
			}
		)
		.setColor("Blurple")
		.setTimestamp();

	return interaction.editReply({ embeds: [embed] });
}
