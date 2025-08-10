import CartHeaderComponent from '@/components/cart/CartHeaderComponent';
import HeaderComponent from '@/components/homePage/HeaderComponent';
import { useAppSelector } from '@/hooks/reduxHooks';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthenticatedLayout() {
  const { colors } = useTheme()
  const { cart } = useAppSelector(state => state.products)

  const count = useMemo(() => {
    return cart.reduce((acc, item) => {
      acc = acc + item.quantity;
      return acc
    }, 0)
  }, [cart])


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'shift',
        tabBarActiveTintColor: colors.blue
      }}>
      <Tabs.Screen
        name="homePage"
        options={{
          headerShown: true,
          header: () => <HeaderComponent />,
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: true,
          header: () => <CartHeaderComponent />,
          tabBarBadge: count > 9 ? "9+" : count,
          tabBarBadgeStyle: {
            color: "#fff",
            backgroundColor: colors.blue,
          },
          tabBarIcon: ({ color }) => <Feather size={28} name="shopping-cart" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          title: 'Profile',
          headerTitleStyle: { fontFamily: "GroteskBold" },
          tabBarIcon: ({ color }) => <Feather size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
