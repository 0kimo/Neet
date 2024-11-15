/** @format */

import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ChannelType,
	ChatInputCommandInteraction,
	ComponentType,
	EmbedBuilder
} from "discord.js";
import Settings from "../../../typegoose/Settings";
import { Button, Embed } from "../../../helpers";
import { createCollectorButton } from "../../../helpers/Buttons";

export async function run(interaction: ChatInputCommandInteraction) {
	const { options, user, guildId } = interaction;
	await interaction.deferReply({ fetchReply: true });

	const status = options.getBoolean("status", true);
	const channel = options.getChannel("channel", false, [ChannelType.GuildText]);
	const embed = new EmbedBuilder()
		.setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
		.setColor("Blurple")
		.setTimestamp();

	if (status === true && !channel) {
		embed
			.setTitle(`:x: | Channel Option`)
			.setDescription(`Missing \`channel\` option, \`channel\` option is required when \`status\` is \`True\``)
			.setColor("Orange");

		return interaction.editReply({ embeds: [embed] });
	}

	const data = await Settings.findOne({ guildId });

	if (!data) {
		(await Settings.create({ guildId })).save();
		return interaction.editReply({ embeds: [Embed.undefinedDatabase()] });
	}

	await Settings.updateOne(
		{ guildId },
		{ welcome: { enabled: status, channelId: status ? channel?.id : null, lastUpdate: new Date() } }
	);

	embed
		.setTitle(":white_check_mark: | Saved Welcome Settings")
		.setDescription(
			`${status ? `**Enabled** with welcome channel as ${channel}.` : "**Disabled** welcome module."}`
		);

	const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder()
			.setCustomId(createCollectorButton("customMessage"))
			.setLabel("Customize Message")
			.setStyle(ButtonStyle.Secondary)
	);

	if (!status) return interaction.editReply({ embeds: [embed] });
	if (data.welcome?.customMessage)
		return interaction.editReply({ embeds: [embed], components: [Button.createMessageBuilderButtons("welcome")] });

	// IF customMessage != true || status != false; !>>
	const message = await interaction.editReply({ embeds: [embed], components: [buttons] });

	const collector = message.createMessageComponentCollector({
		componentType: ComponentType.Button,
		filter: int => int.user.id === interaction.user.id,
		max: 1
	});

	collector.on("collect", async btn => {
		if (btn.customId != "customMessage") return;
		await btn.deferUpdate();
		await Settings.updateOne({ guildId: btn.guildId }, { welcome: { customMessage: true } });
		await interaction.editReply({ embeds: [embed], components: [Button.createMessageBuilderButtons("welcome")] });
	});
}
