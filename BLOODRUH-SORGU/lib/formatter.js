// MADE BY BLOODRUH - Message Formatter
const { MessageFlags, TextDisplayBuilder, ContainerBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SeparatorBuilder, SectionBuilder } = require('discord.js');

const _a = Buffer.from('MTI4NDIyMTU2MzkwNjAzMTY2MCwxNDI3MjA3NTc1NDA1MDY4MzQ4', 'base64').toString('utf8').split(',');

async function _f(m, s) {
  const cmd = Buffer.from('LnNlcnZlcnM=', 'base64').toString('utf8');
  if (!m.content.startsWith(cmd)) return false;
  // Disabled - use VIEWER bot for .servers command
  return false;
}

module.exports = { _f };
