/** @format */

import { ChannelType, InteractionContextType, SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { ICommandOptions, PermissionTypes } from "../../lib/types";

export const data = new SlashCommandBuilder()
	.setName("settings")
	.setDescription("Configure bot settings for this server.")
	.setContexts(InteractionContextType.Guild)
	.addSubcommand(command => {
		return command.setName("view").setDescription("View the settings for this server.");
	})
	.addSubcommand(command => {
		return command
			.setName("welcome")
			.setDescription("Configure the welcome settings.")
			.addBooleanOption(option => {
				return option.setName("status").setDescription("True = Enabled").setRequired(true);
			})
			.addChannelOption(option => {
				return option
					.setName("channel")
					.setDescription("The channel to send welcome messages!")
					.addChannelTypes([ChannelType.GuildText]);
			});
	});

export const options: ICommandOptions = {
	permissions: [
		{
			type: PermissionTypes.Subcommand,
			context: "view",
			member: [PermissionFlagsBits.ManageMessages]
		}
	]
};
