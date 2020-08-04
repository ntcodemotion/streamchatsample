import CONSTANTS from './constants';
import {StreamChat, Channel, OwnUserResponse, Event} from 'stream-chat';

class ChatHelper {
  private client: StreamChat;

  private currentConversation: Channel | null = null;

  constructor(apiKey: string) {
    this.client = new StreamChat(apiKey, undefined, {
      timeout: 60 * 1000,
    });
  }

  public async initClient() {
    await this.client.disconnect();
    const user = await this.client.setUser(
      {
        id: CONSTANTS.STREAM_USER_ID,
      },
      CONSTANTS.STREAM_USER_JWT,
    );
    console.log('USER', user);
    await this.client.connect();
  }

  public getClient() {
    return this.client;
  }

  public getCurrentConversation() {
    return this.currentConversation;
  }

  public setCurrentConversation(conv: Channel) {
    this.currentConversation = conv;
  }

  public async getUsers() {
    const users = await this.client.queryUsers({}, {limit: 100}, {presence: true});
    return users.users;
  }

  public async initConversation(targetUserId: string) {
    const currentUserId = CONSTANTS.STREAM_USER_ID;
    const convo = this.client.channel('messaging', '', {
      members: [targetUserId, currentUserId],
    });

    await convo.watch({
      state: true,
      watch: true,
      presence: true,
    });
    this.currentConversation = convo;
    return convo;
  }

  // NOTE THIS IS ONLY FOR DEV PURPOSES AND ONLY FOR THIS EXAMPLE.
  // IN PRODUCTION APP THIS CODE IS ON BACKEND.
  public async clearMyChats() {
    const currentUserId = CONSTANTS.STREAM_USER_ID;
    const channels = await this.client.queryChannels(
      {type: 'messaging', members: {$in: [currentUserId]}},
      undefined,
      {limit: 1000},
    );
    let deletedCount = 0;
    for (const channel of channels) {
      const channelMembers = Object.keys(channel.state.members);
      console.log('members', channelMembers.join(', '));
      if (channelMembers.includes(currentUserId)) {
        await channel
          .delete()
          .then(() => {
            deletedCount++;
          })
          .catch(() => {
            console.log('skipped channel not created by me');
          });
      }
    }

    console.log('DELETED COUNT', deletedCount);
  }
}

export default new ChatHelper(CONSTANTS.STREAM_API_KEY);
