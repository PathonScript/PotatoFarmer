import DiscordBot from '@src/DiscordBot';
import { Interaction } from 'discord.js';
import PingCommand from '@src/commands/common/PingCommand';

class MainDiscordBot extends DiscordBot {

  protected onReady(): void {
    console.info(`Logged in as ${this.client.user.tag} !`);

    this.commandManager.registerCommand([
      new PingCommand(),
    ]);
  }

  protected async onInteractionCreate(interaction: Interaction): Promise<void> {
    if (!interaction.isCommand()) return;
    await this.commandManager.executeCommand(interaction);
  }

}

export default MainDiscordBot;