import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {NavigationStackProp} from 'react-navigation-stack';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from 'stream-chat-react-native';
import ChatHelper from './ChatHelper';
import {UserResponse} from 'stream-chat';
interface Props {
  navigation: NavigationStackProp;
}

const UsersScreen: React.FC<Props> = ({navigation}) => {
  const [users, setUsers] = useState<UserResponse[]>([]);

  const openChat = useCallback<(user: UserResponse) => void>(
    (user) => {
      ChatHelper.initConversation(user.id).then(() => {
        navigation.push('CHAT');
      });
    },
    [users, navigation],
  );

  useEffect(() => {
    ChatHelper.getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {users.map((u) => (
          <TouchableOpacity
            key={u.id}
            onPress={() => openChat(u)}
            style={{
              display: 'flex',
              backgroundColor: 'white',
              flexDirection: 'row',
              marginBottom: 8,
              borderWidth: 1,
              borderColor: 'gray',
            }}>
            <Image style={{width: 64, height: 64}} source={{url: u.image}}/>
            <Text style={{flex: 1}}>{u.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UsersScreen;
