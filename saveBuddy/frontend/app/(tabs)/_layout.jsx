import { Tabs } from "expo-router";

import HomeIcon from "../../assets/images/home.svg";
import TrophyIcon from "../../assets/images/trophy.svg";
import AnalyseIcon from "../../assets/images/stats.svg";
import ProfileIcon from "../../assets/images/user.svg";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          marginHorizontal: 30,
          borderRadius: 999,
          height: 74,
          backgroundColor: "#12384C",

          paddingTop: 15,

          borderTopWidth: 0,

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.12,
          shadowRadius: 10,
          elevation: 10,
        },

        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              width={24}
              height={24}
              fill={focused ? "white" : "#D9D9D9"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="badges"
        options={{
          tabBarIcon: ({ focused }) => (
            <TrophyIcon
              width={24}
              height={24}
              fill={focused ? "white" : "#D9D9D9"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="analysis"
        options={{
          tabBarIcon: ({ focused }) => (
            <AnalyseIcon
              width={24}
              height={24}
              fill={focused ? "white" : "#D9D9D9"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              width={24}
              height={24}
              fill={focused ? "white" : "#D9D9D9"}
            />
          ),
        }}
      />
    </Tabs>
  );
}