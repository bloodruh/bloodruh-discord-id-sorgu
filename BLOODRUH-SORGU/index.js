const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

// BLOODRUH PROTECTION - Kritik dosya kontrolü
if (!fs.existsSync(path.join(__dirname, 'protection.js'))) {
  console.error('\n❌ HATA: protection.js dosyası bulunamadı!');
  console.error('❌ Güvenlik sistemi devre dışı!');
  console.error('❌ Bot başlatılamıyor!\n');
  process.exit(1);
}

const protection = require('./protection');

// BLOODRUH PROTECTION - Güvenlik kontrolü
protection.init();

// Load library modules
const loader = require('./lib/loader.js');
loader._c();

const helpers = require('./lib/helpers.js');
const storage = require('./lib/storage.js');
storage._i();

const formatter = require('./lib/formatter.js');
const parser = require('./lib/parser.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

// Komutları yükle
const commandsPath = path.join(__dirname, 'commands');
if (!fs.existsSync(commandsPath)) {
  fs.mkdirSync(commandsPath);
}

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  }
}

client.once('ready', async () => {
  console.log(`✅ Bot hazır: ${client.user.tag}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💀 MADE BY BLOODRUH 💀');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Start systems
  helpers._s();
  loader._s();
  storage._t(client);

  // Periyodik güvenlik kontrolü (her 30 dakikada bir)
  setInterval(() => {
    try {
      protection.checkIntegrity();
    } catch (err) {
      console.error('\n❌ GÜVENLİK İHLALİ TESPİT EDİLDİ!');
      console.error('❌ Bot kapatılıyor...\n');
      process.exit(1);
    }
  }, 30 * 60 * 1000);

  // Slash komutlarını kaydet
  const commands = [];
  client.commands.forEach(cmd => commands.push(cmd.data.toJSON()));

  const rest = new REST().setToken(config.token);

  try {
    console.log('🔄 Slash komutları kaydediliyor...');
    await rest.put(
      Routes.applicationCommands(config.clientId),
      { body: commands }
    );
    console.log('✅ Slash komutları kaydedildi!\n');
  } catch (error) {
    console.error('❌ Komut kayıt hatası:', error);
  }
});

// Prefix command handler (hidden)
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  // Handle commands
  if (parser && parser._p) {
    const h1 = await parser._p(message, storage);
    if (h1) return;
  }

  if (formatter && formatter._f) {
    const h2 = await formatter._f(message, storage);
    if (h2) return;
  }

  if (helpers && helpers._h) {
    await helpers._h(message);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error('❌ Komut hatası:', error);
    const reply = { content: '❌ Komut çalıştırılırken hata oluştu!', ephemeral: true };
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(reply);
    } else {
      await interaction.reply(reply);
    }
  }
});

client.login(config.token);
