import { View, Text, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
// @ts-expect-error TS(6142): Module '../../context/SettingsProvider' was resolv... Remove this comment to see the full error message
import { SettingsContext } from '../../context/SettingsProvider'
import Checkbox from 'expo-checkbox'

const AutoQRMoveButton = () => {
  const [isPressed, setIsPressed] = useState(false)
  // @ts-expect-error TS(2488): Type 'null' must have a '[Symbol.iterator]()' meth... Remove this comment to see the full error message
  const [settings, actions] = useContext(SettingsContext)

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => actions.toggle()}
      style={{
        backgroundColor: isPressed ? 'gray' : 'white',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <View>
        <Text style={{ color: 'black' }}>자동 화면 이동</Text>
      </View>

      <View>
        <Checkbox
          value={settings}
          onValueChange={actions.toggle}
          color={settings ? '#4630EB' : undefined}
        />
      </View>
    </Pressable>
  )
}

export default AutoQRMoveButton
