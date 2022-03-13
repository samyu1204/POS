import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MenuScreen from './MenuScreen';
import OrderHistory from './OrderHistoryScreen';
import Analytics from './Analytics';
import EditMenu from './EditMenu';
import CustomDrawer from './CustomDrawer';
import OrderScreen from './OrderScreen';

const Drawer = createDrawerNavigator();

function StartScreen() {
    return (
        <Drawer.Navigator 
          initialRouteName="Menu" 
          screenOptions={{ 
            headerShown: true, 
            drawerActiveTintColor: 'black',
            drawerLabelStyle: { 
              marginLeft: -20, 
              fontSize: 20 } 
          }}
          drawerContent={props => <CustomDrawer {...props} />}
        >
          <Drawer.Screen name="Menu" component={MenuScreen} options={{ 
            drawerIcon: ({ color }) => (
              <Ionicons name='logo-ionic' size={22} color={color} />
            ) 
           }} />
  
          <Drawer.Screen name="OrderHistory" component={OrderHistory} options={{ 
            drawerIcon: ({ color }) => (
              <Ionicons name='receipt' size={22} color={color} />
            )
           }} />

          <Drawer.Screen name="Analytics" component={Analytics} options={{ 
            drawerIcon: ({ color }) => (
              <Ionicons name='stats-chart-outline' size={22} color={color} />
            )
           }} />
  
          <Drawer.Screen name="EditMenu" component={EditMenu} options={{ 
            drawerIcon: ({ color }) => (
              <Ionicons name='pencil-outline' size={22} color={color} />
            )
           }} />

          <Drawer.Screen name="Ordering" component={OrderScreen} options={{ 
            drawerIcon: ({ color }) => (
              <Ionicons name='pencil-outline' size={22} color={color} />
            )
           }} />           
        </Drawer.Navigator>
    );
  }
  

export default StartScreen;