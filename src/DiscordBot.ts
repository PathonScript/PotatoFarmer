import { Client, Intents, Interaction } from 'discord.js';
import { REST as DiscordAPI } from '@discordjs/rest';
import CommandManager from '@src/commands/CommandManager';
import LitathaBot from '@src/LitathaBot';
import LogInfo from '@utils/LogInfo';

abstract class DiscordBot implements LitathaBot {

  protected readonly client: Client;

  private readonly intents: number[] = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ];

  private readonly discordAPI: DiscordAPI;

  protected readonly commandManager: CommandManager;

  private readonly TOKEN: string;

  public constructor(TOKEN: string) {
    this.client = new Client({ intents: this.intents });
    this.discordAPI = new DiscordAPI({ version: '9' }).setToken(TOKEN);
    this.commandManager = new CommandManager(this.client, this.discordAPI);
    this.TOKEN = TOKEN;
  }

  public async build(): Promise<void> {
    LogInfo.client('Loading resource..');
    this.client.destroy();

    setTimeout(async () => {
      await this.client.login(this.TOKEN);
    }, 2000);

    this.client.on('ready', this.onReady.bind(this));
    this.client.on('interactionCreate', this.onInteractionCreate.bind(this));
  }

  public getClient(): Client {
    return this.client;
  }

  protected abstract onReady(): void;

  protected abstract onInteractionCreate(interaction: Interaction): Promise<void>;

}

export default DiscordBot;
