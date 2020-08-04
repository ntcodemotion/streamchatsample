import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from 'stream-chat-react-native';
import ChatHelper from "./ChatHelper";
interface Props {
}

const ChatScreen: React.FC<Props> = ({}) => {
  const channel = ChatHelper.getCurrentConversation();
  return (
    <SafeAreaView>
      <Chat client={ChatHelper.getClient()}>
        <Channel client={ChatHelper.getClient()} channel={channel}>
          <View style={{display: 'flex', height: '100%'}}>
            <MessageList />
            <MessageInput hasFilePicker={false} hasImagePicker={false} />
          </View>
        </Channel>
      </Chat>
    </SafeAreaView>
  );
};

export default ChatScreen;
