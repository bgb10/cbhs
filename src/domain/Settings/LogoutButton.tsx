import { View, Text, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
// @ts-expect-error TS(6142): Module '../../context/AuthProvider' was resolved t... Remove this comment to see the full error message
import { AuthFunctionContext } from '../../context/AuthProvider'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Icon from 'react-native-vector-icons/Ionicons'

const LogoutButton = () => {
  const [isPressed, setIsPressed] = useState(false)
  // @ts-expect-error TS(2339): Property 'signOut' does not exist on type 'null'.
  const { signOut } = useContext(AuthFunctionContext)

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={signOut}
      style={{
        backgroundColor: isPressed ? 'gray' : 'white',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <View>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Text style={{ color: 'red' }}>로그아웃</Text>
      </View>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <View>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Text>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Icon name="chevron-forward-outline" size={20} color="black" />
        </Text>
      </View>
    </Pressable>
  )
}

export default LogoutButton
