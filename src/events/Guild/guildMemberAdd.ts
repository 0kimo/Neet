/** @format */

import { EmbedBuilder, Events, GuildMember } from "discord.js";
import Settings from "../../typegoose/Settings";
import Messages, { ModuleTypes } from "../../typegoose/Messages";

export default {
	name: Events.GuildMemberAdd,
	once: false,
	run: async (member: GuildMember) => {
		const { guild } = member;
		const data = await Settings.findOne({ guildId: guild.id });
		console.log(data);

		if (!data) return (await Settings.create({ guildId: guild.id })).save();
		if (!data.welcome?.enabled) return;

		if (data.welcome.customMessage) {
			const messages = await Messages.findOne({ guildId: guild.id });
			console.log(messages);

			if (!messages) return await Messages.create({ guildId: guild.id });
			if (!messages.modules?.find(i => i.module === ModuleTypes.Welcome)) return;
		}

		const embed = new EmbedBuilder()
			.setAuthor({ name: guild.name, iconURL: guild.iconURL()! })
			.setDescription(`${member} joined`)
			.setColor("Blurple")
			.setTimestamp();

		const channel = guild.channels.cache.get(data.welcome.channelId!);
		if (!channel || !channel.isSendable()) return;
		return await channel.send({ embeds: [embed] });
	}
};
