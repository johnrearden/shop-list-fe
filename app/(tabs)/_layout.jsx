import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router';


const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center gap-2">
            <Text 
                className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232523',
                        height: 84,
                    }
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Index',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon 
                                color={color}
                                name="Index"
                                focused={focused}
                            />
                        )   
                    }}
                />
                <Tabs.Screen
                    name="new_list"
                    options={{
                        title: 'New List',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon 
                                color={color}
                                name="New List"
                                focused={focused}
                            />
                        )   
                    }}
                />
                <Tabs.Screen
                    name="auth"
                    options={{
                        title: 'Auth',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon 
                                color={color}
                                name="Auth"
                                focused={focused}
                            />
                        )   
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout