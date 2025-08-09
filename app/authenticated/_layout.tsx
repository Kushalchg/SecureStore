import HeaderComponent from '@/components/homePage/HeaderComponent';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthenticatedLayout() {
  const { colors } = useTheme()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary
      }}>
      <StatusBar style='auto' />
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
          title: 'Cart',
          tabBarBadge: 9,
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
          title: 'Profile',
          tabBarIcon: ({ color }) => <Feather size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    // color: colors.text,
  },

})

// <Stack
//   initialRouteName='cart'
//   screenOptions={{
//
//     animation: 'slide_from_right'
//
//   }}>
//   {/* <Stack.Screen name="homePage" */}
//   {/*   options={{ */}
//   {/*     headerShown: true, */}
//   {/*     header: () => <HeaderComponent /> */}
//   {/*   }} */}
//   {/* /> */}
//   {/* <Stack.Screen name="cart" options={{ headerShown: true }} /> */}
//
// </Stack>
