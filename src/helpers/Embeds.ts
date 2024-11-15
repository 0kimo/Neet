/** @format */

import { ColorResolvable, EmbedBuilder } from "discord.js";

export function undefinedDatabase(
	content?: string,
	options?: { color?: ColorResolvable; prefix?: string; timestamp?: boolean }
) {
	const embed = new EmbedBuilder()
		.setTitle(`:warning: | Missing Data`)
		.setDescription((content ??= `Detacted no data for this server, please use this command again.`))
		.setColor(options?.color ?? "Orange");

	if (options?.timestamp != false) embed.setTimestamp();
	return embed;
}

export function permissionsWarning(
	missing: string | string[],
	options?: { color?: ColorResolvable; prefix?: string; timestamp?: boolean }
) {
	const embed = new EmbedBuilder()
		.setTitle(":x: | Missing Permissions")
		.setDescription(
			`${options?.prefix} need these permissions to run this interaction.\n\n**»»»** Permissions: ${Array.isArray(missing) ? `[**${missing.length}**]` : ""}\n${Array.isArray(missing) ? missing.join(", ") : missing}`
		)
		.setColor(options?.color ?? "Orange");

	if (options?.timestamp != false) embed.setTimestamp();
	return embed;
}
