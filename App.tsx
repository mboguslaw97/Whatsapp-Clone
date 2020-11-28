import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import config from './aws-exports';
import { createUser } from './graphql/mutations';
import { getUser } from './graphql/queries';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

Amplify.configure(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchUser = async () => {
      // get Authenticated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      if (userInfo) {
        // get the user from the backend with the user Sub from Auth
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );

        if (userData.data.getUser) {
          return;
        }

        // if there is no user in the DB with the ID, then create one
        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageURI:
            "https://scontent.fkiv3-1.fna.fbcdn.net/v/t1.0-1/p200x200/107443858_3074598385966770_1929559809312242379_n.jpg?_nc_cat=107&_nc_sid=7206a8&_nc_eui2=AeGly5fZLQUfAKei_EiACEq5Dfw2T_M-BQMN_DZP8z4FA_aLEVK_8e0dKvl_5vxVO0Zn-4OPzQ9pKS0c0XeXd898&_nc_ohc=z1ydC_UL4KsAX_tfrbv&_nc_oc=AQknywM4y1IAQaQZaZkPdtkUmaem060LXSByeTx3pdQXWfxW2_tdzfgRsQIXQK_zV94&_nc_ht=scontent.fkiv3-1.fna&tp=6&oh=69508c88f073f64f432fc1f1ab9299e8&oe=5F9C5FD5",
          status: "Hi, I am using Whatsapp",
        };

        await API.graphql(graphqlOperation(createUser, { input: newUser }));
      }
    };
    fetchUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
