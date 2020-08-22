import { LOG_PARSER_TEAMKILL } from 'squad-server/events/log-parser';

export default {
  name: 'auto-tk-warn',
  description:
    'The `auto-tk-warn` plugin will automatically warn players in game to apologise for teamkills when they ' +
    'teamkill another player.',

  defaultDisabled: false,
  optionsSpec: {
    message: {
      type: 'String',
      required: false,
      default: 'Please apologise for ALL TKs in ALL chat!',
      description: 'The message to warn players with.'
    }
  },

  init: async (server, connectors, options) => {
    server.on(LOG_PARSER_TEAMKILL, (info) => {
      // ignore suicides
      if (info.attacker.steamID === info.victim.steamID) return;
      server.rcon.execute(`AdminWarn "${info.attacker.steamID}" ${options.message}`);
    });
  }
};
