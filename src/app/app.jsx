import {
  AdaptivityProvider,
  AppRoot,
  Avatar,
  ConfigProvider,
  Div,
  Group,
  NativeSelect,
  Panel,
  PanelHeader,
  PanelHeaderContent,
  ScreenSpinner,
  SplitCol,
  SplitLayout,
  Tabs,
  TabsItem,
  Text,
  View,
} from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import { ProfilePage } from '../pages/profile';
import { ShopPage } from '../pages/shop';
import '@vkontakte/vkui/dist/vkui.css';
import bridge from '@vkontakte/vk-bridge';

const Panels = {
  Shop: 'Shop',
  Profile: 'Profile',
};

const PanelsHeaders = {
  [Panels.Shop]: 'Магазин',
  [Panels.Profile]: 'Профиль',
};

const App = () => {
  const [users, setUsers] = useState([]);

  const [pageTab, setPageTab] = useState(Panels.Shop);
  const [user, setUser] = useState(null);

  const [popout, setPopout] = useState(null);

  const clearPopout = () => setPopout(null);

  useEffect(async () => {
    const user = await bridge.send('VKWebAppGetUserInfo');

    setUsers([
      user,
      {
        ...user,
        id: 7294430,
        first_name: 'Иванов',
        last_name: 'Доставка',
      },
      {
        ...user,
        id: 7294431,
        first_name: 'Петров',
        last_name: 'Доставка',
      },
      {
        ...user,
        id: 143475301,
        first_name: 'Волож',
        last_name: 'Продавец',
      },
    ]);

    setUser(user);
  }, []);

  const setDoneScreenSpinner = () => {
    setPopout(<ScreenSpinner state='loading' />);
  };

  const stopAndGo = () => {
    setPopout(<ScreenSpinner state='done' aria-label='Успешно' />);

    clearPopout();

    setPageTab(Panels.Profile);
  };

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel='panel'>
                <Panel id='panel'>
                  <PanelHeader
                    before={
                      <Div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar size={36} src={user?.photo_max_orig} style={{ marginRight: '0.5em' }} />
                        <Text weight='1'>
                          {user?.first_name} {user?.last_name}
                        </Text>
                        <NativeSelect
                          style={{ marginLeft: '0.5em' }}
                          onChange={e => setUser(users.find(u => u.id === +e.target.value))}
                        >
                          {users.map(u => <option key={u.id} value={u.id}>{u?.first_name} {u?.last_name}</option>)}
                        </NativeSelect>
                      </Div>
                    }
                  >
                    <PanelHeaderContent>
                      <Tabs>
                        <TabsItem
                          selected={pageTab === Panels.Shop}
                          onClick={() => setPageTab(Panels.Shop)}
                          id='page-tab-shop'
                          aria-controls='page-tab-shop__content'
                        >
                          {PanelsHeaders[Panels.Shop]}
                        </TabsItem>
                        <TabsItem
                          selected={pageTab === Panels.Profile}
                          onClick={() => setPageTab(Panels.Profile)}
                          id='page-tab-profile'
                          aria-controls='page-tab-profile__content'
                        >
                          {PanelsHeaders[Panels.Profile]}
                        </TabsItem>
                      </Tabs>
                    </PanelHeaderContent>
                  </PanelHeader>
                  {pageTab === Panels.Shop && (
                    <Group
                      id='page-tab-shop__content'
                      aria-labelledby='page-tab-shop'
                      role='tabpanel'
                    >
                      <Div>
                        <ShopPage user={user} onLoad={setDoneScreenSpinner} onLoaded={stopAndGo} />
                      </Div>
                    </Group>
                  )}
                  {pageTab === Panels.Profile && (
                    <Group
                      id='page-tab-profile__content'
                      aria-labelledby='page-tab-profile'
                      role='tabpanel'
                    >
                      <ProfilePage
                        user={user}
                        onLoading={setDoneScreenSpinner}
                        onLoaded={() => {
                          setPopout(<ScreenSpinner state='done' aria-label='Успешно' />);
                          clearPopout();
                        }}
                      />
                    </Group>
                  )}
                </Panel>
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
