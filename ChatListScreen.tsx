import React, {useCallback, useMemo} from 'react';
import {Button, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {
  Chat,
  ChannelList,
  ChannelPreviewMessenger,
} from 'stream-chat-react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import CONSTANTS from './constants';
import ChatHelper from './ChatHelper';
import {Channel} from 'stream-chat';

interface Props {
  navigation: NavigationStackProp;
}

const ChatListScreen: React.FC<Props> = ({navigation}) => {
  const onChannelClick = useCallback<(conv: Channel) => void>(
    (conv) => {
      ChatHelper.setCurrentConversation(conv);
      navigation.push('CHAT');
    },
    [navigation],
  );

  const onOpenUsers = useCallback(() => {
    navigation.push('USERS');
  }, [navigation]);

  const onDeleteAllChats = useCallback(() => {
    ChatHelper.clearMyChats();
  }, []);

  return (
    <SafeAreaView>
      <Chat client={ChatHelper.getClient()}>
        <View
          style={{
            display: 'flex',
            height: '100%',
            padding: 10,
            borderWidth: 1,
            borderColor: 'cyan',
          }}>
          <ChannelList
            onSelect={onChannelClick}
            filters={{
              type: 'messaging',
              members: {$in: [CONSTANTS.STREAM_USER_ID]},
            }}
            Preview={ChannelPreviewMessenger}
          />
          <Button title={'Create new chat'} onPress={onOpenUsers} />
          <Button title={'Clear all my chats'} onPress={onDeleteAllChats} />
        </View>
      </Chat>
    </SafeAreaView>
  );
};

export default ChatListScreen;
