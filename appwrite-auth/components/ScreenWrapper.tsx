import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface screenProps{
    children:React.ReactNode
}

const ScreenWrapper = ({children}:screenProps) => {
    const { top } = useSafeAreaInsets()
    const paddingTop = top > 0 ?top+5 : 30
  return (
    <View style={{flex:1, paddingTop, backgroundColor:"white",paddingHorizontal:20}} >
      {
        children
      }
    </View>
  )
}

export default ScreenWrapper