const api = require("discord.js-selfbot-v13");
const { Options } = api
const { joinVoiceChannel } = require('@discordjs/voice')
const config = require("./config.json");
const { logs } = require('more-consoles')
const { rpc } = require('./rpc')
require('dotenv').config()
try {
  Hosting(process.env.TOKEN)
  function Hosting(token) {

    const userclient = new api.Client({
      sweepers: {
        ...Options.DefaultSweeperSettings,
        messages: {
          interval: 3600,
          lifetime: 1800,
        },
        users: {
          interval: 3600,
          filter: () => user => user.bot && user.id !== client.user.id,
        },
        channels: {
          interval: 3600,
          lifetime: 1800,
        },
      },
      checkUpdate: false,

    })
    Options.cacheWithLimits({
      messageCacheMaxSize: 10,
      messageCacheLifetime: 30 * 60,
      messageSweepInterval: 5 * 60,
    })
    if (!config.voice || config.voice == '') {
      console.log("Voice channel wasn't provided the system for voice is disabled");
    }
    if (!config.text || config.text == '') {
      console.log("Text channel wasn't provided the system for text is disabled");
    }
    if (!config.guild || config.guild == '') {
      console.log("Guild wasn't provided, This might produce some errors");
    }
    if (!config.status || config.status == '' || !["dnd", "idle", "online", "invisible"].includes(config.status)) {
      console.log("Status wasn't provided the Default is idle");
    }
    if (!config.mute || config.mute == '' || !['true', 'false'].includes(config.mute)) {
      console.log("Muted status is not provided Default is false (not muted)");
    }
    if (!config.deafen || config.deafen == '' || !['true', 'false'].includes(config.deafen)) {
      console.log("Defen status is not provided Default is false (not deafen)");
    }
    userclient.once("ready", async () => {
      if (config.status !== 'twitch') {
        if (!["dnd", "idle", "online", "invisible", "twitch"].includes(config.status)) {
          userclient.user.setStatus('idle')
        } else {
          userclient.user.setStatus(config.status || 'idle')
        }

      }
      rpc(userclient)
      logs('logged in successfully!', userclient)
      if (config.voice !== "voice-channel-id-here") {
        const vc = userclient.channels.cache.get(config.voice)
        let guild = vc.guild
        let botMem = guild.members.cache.get(userclient.user.id)
        if (!botMem.voice.channel) {
          let mute = config.mute
          if (mute == 'true') {
            mute = true
          } else {
            mute = false
          }
          let deafen = config.deafen
          if (deafen == 'true') {
            deafen = true
          } else {
            deafen = false
          }
          const connection = joinVoiceChannel(
            {
              channelId: config.voice,
              guildId: vc.guildId,
              adapterCreator: vc.guild.voiceAdapterCreator,
              selfDeaf: deafen,
              selfMute: mute
            }
          );
        }
      }

      console.log('Connected: ' + userclient.user.tag);
      const words = ['ability',
        'able',
        'about',
        'above',
        'accept',
        'according',
        'account',
        'across',
        'act',
        'action',
        'activity',
        'actually',
        'add',
        'address',
        'administration',
        'admit',
        'adult',
        'affect',
        'after',
        'again',
        'against',
        'age',
        'agency',
        'agent',
        'ago',
        'agree',
        'agreement',
        'ahead',
        'air',
        'church',
        'citizen',
        'city',
        'civil',
        'claim',
        'class',
        'clear',
        'clearly',
        'close',
        'coach',
        'cold',
        'collection',
        'college',
        'color',
        'come',
        'commercial',
        'common',
        'community',
        'company',
        'compare',
        'computer',
        'concern',
        'condition',
        'conference',
        'Congress',
        'consider',
        'consumer',
        'contain',
        'continue',
        'control',
        'cost',
        'could',
        'country',
        'couple',
        'course',
        'court',
        'cover',
        'create',
        'crime',
        'cultural',
        'culture',
        'cup',
        'current',
        'customer',
        'cut',
        'dark',
        'data',
        'daughter',
        'day',
        'dead',
        'deal',
        'death',
        'debate',
        'decade',
        'decide',
        'decision',
        'deep',
        'defense',
        'degree',
        'Democrat',
        'democratic',
        'describe',
        'design',
        'despite',
        'detail',
        'determine',
        'develop',
        'development',
        'die',
        'difference',
        'different',
        'difficult',
        'dinner',
        'direction',
        'director',
        'discover',
        'discuss',
        'discussion',
        'disease',
        'do',
        'doctor',
        'dog',
        'door',
        'down',
        'draw',
        'dream',
        'drive',
        'drop',
        'drug',
        'during',
        'each',
        'early',
        'east',
        'easy',
        'eat',
        'economic',
        'economy',
        'edge',
        'education',
        'effect',
        'effort',
        'eight',
        'either',
        'election',
        'else',
        'employee',
        'end',
        'energy',
        'enjoy',
        'enough',
        'enter',
        'entire',
        'environment',
        'environmental',
        'especially',
        'establish',
        'even',
        'evening',
        'event',
        'ever',
        'every',
        'everybody',
        'everyone',
        'everything',
        'evidence',
        'exactly',
        'example',
        'executive',
        'exist',
        'expect',
        'experience',
        'expert',
        'explain',
        'eye',
        'face',
        'fact',
        'factor',
        'fail',
        'fall',
        'family',
        'far',
        'fast',
        'father',
        'fear',
        'federal',
        'feel',
        'feeling',
        'few',
        'field',
        'fight',
        'figure',
        'fill',
        'film',
        'final',
        'finally',
        'financial',
        'find',
        'fine',
        'finger',
        'finish',
        'fire',
        'firm',
        'first',
      ]

      if (config.text !== "text-channel-id-here" && config.guild !== "guild-id-here") {
        const tx = userclient.channels.cache.get(config.text)
        if (!tx) {
          console.log('Invalid Text Channel!');
        } else {

          intervalId = setInterval(async () => {
            //await tx.sendTyping();
            await tx.send(words[Math.floor(Math.random() * words.length)]).catch((err) => {
              console.log(err);
              clearInterval(intervalId)
            });
          }, 2000);
        }

      } else {
        console.log('text channel wasn\'t provided or the guild id wasn\'t correct!');
      }

      console.log('Connected: ' + userclient.user.tag);
    });

    if (config.voice !== "voice-channel-id-here") {
      userclient.on('voiceStateUpdate', async (oldState, newState) => {
        if (newState.id !== userclient.user.id) return
        const vc = userclient.channels.cache.get(config.voice)
        //let memberId = oldState.id || newState.id
        const guild = vc.guild
        //let botMem = guild.members.cache.get(userclient.user.id)
        if (oldState.channelId && !newState.channelId || newState.channel.id == oldState.guild.afkChannel.id) {
          console.log('check!');
          let mute = config.mute
          if (mute == 'true') {
            mute = true
          } else {
            mute = false
          }
          let deafen = config.deafen
          if (deafen == 'true') {
            deafen = true
          } else {
            deafen = false
          }
          const connection = joinVoiceChannel(
            {
              channelId: config.voice,
              guildId: guild.id,
              adapterCreator: vc.guild.voiceAdapterCreator,
              selfDeaf: deafen,
              selfMute: mute
            }
          );
        }
      })
    }

    userclient.login(token).catch((err) => {
      console.log('Invalid Token');
      process.exit(1)
    }).then(() => {
      console.log('logged in as: ' + userclient.user.tag);
    });
  }

  process.on('uncaughtException', function(exception) {
  });
  process.on('unhandledRejection', error => {
    console.log(error);
  });

} catch (err) {
  console.log(err);
}
require('./kalive')()
