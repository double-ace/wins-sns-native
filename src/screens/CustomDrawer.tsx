import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { requestHttpGet } from '../scripts/requestBase';

export const CustomDrawerRender = (props) => {
  return <CustomDrawer {...props} />;
};

const CustomDrawer = () => {
  const [shops, setShops] = useState<any[]>([]);

  useEffect(() => {
    const getMyShop = async () => {
      // const res = await requestHttpGet('/api/v1/core/belong-to/');
      // res.data[0] ? setShops(res.data) : null;
    };

    getMyShop();
  }, []);

  return (
    <DrawerContentScrollView>
      {shops.map((shop: any) => {
        return (
          <DrawerItem label={shop.shop} onPress={() => console.log('aa')} />
        );
      })}
    </DrawerContentScrollView>
  );
};
