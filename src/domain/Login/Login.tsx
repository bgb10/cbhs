import React, { useContext, useEffect, useState } from 'react'
import { View, Image, Text, TextInput, StyleSheet, Pressable } from 'react-native'
// @ts-expect-error TS(6142): Module '../../context/AuthProvider' was resolved t... Remove this comment to see the full error message
import { AuthFunctionContext } from '../../context/AuthProvider'
import { useFonts } from 'expo-font'
import Checkbox from 'expo-checkbox'
import * as SecureStore from 'expo-secure-store'
// @ts-expect-error TS(1149): File name '/Users/parkgwanbin/draft/cbhs/src/data/... Remove this comment to see the full error message
import { AUTO_LOGIN_ENABLED_KEY } from '../../data/Constants'

const LoginScreen = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [isError, setIsError] = useState(false)
  const [isAutoChecked, setIsAutoChecked] = useState(true)

  const [isFontLoaded, error] = useFonts({
    'SpoqaHanSansNeo-Medium': require('../../../assets/fonts/SpoqaHanSansNeo-Medium.otf'),
    BMJUA: require('../../../assets/fonts/BMJUA.otf')
  })

  // @ts-expect-error TS(2339): Property 'signIn' does not exist on type 'null'.
  const { signIn } = useContext(AuthFunctionContext)

  const toggleAutoLogin = () => {
    setIsAutoChecked((p) => !p)
  }

  const onLoginPressHandler = async () => {
    try {
      setIsError(false)
      await signIn({ id, pw })
      await SecureStore.setItemAsync(AUTO_LOGIN_ENABLED_KEY, isAutoChecked ? 'true' : 'false')
    } catch (e) {
      setIsError(true)
    }
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <View style={styles.container}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <View
          style={{
            marginTop: 100,
            marginBottom: 60,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Image style={{ width: 48, height: 48 }} source={require('../../../assets/cbhs.png')} />
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Text style={styles.title}>충북학사</Text>
        </View>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <TextInput
          value={id}
          onChangeText={setId}
          autoCapitalize="none"
          placeholder="학사 번호"
          style={styles.input}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <TextInput
          value={pw}
          onChangeText={setPw}
          placeholder="비밀 번호"
          secureTextEntry
          style={styles.input}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Pressable style={styles.CTAbutton} onPress={onLoginPressHandler}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Text style={styles.CTAtext}>로그인</Text>
        </Pressable>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <View
          style={{
            width: '75%',
            paddingLeft: 10
          }}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start' // Set alignSelf to flex-start. Pressable component will only take up the space needed by its children.
            }}
            onPress={toggleAutoLogin}
          >
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Checkbox
              // @ts-expect-error TS(2339): Property 'checkbox' does not exist on type 'NamedS... Remove this comment to see the full error message
              style={styles.checkbox}
              value={isAutoChecked}
              onValueChange={toggleAutoLogin}
              color={isAutoChecked ? '#4630EB' : undefined}
            />
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Text style={{ margin: 5 }}>자동 로그인</Text>
          </Pressable>
        </View>
        {isError && (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Text style={styles.error}>
            {'학사 번호 또는 비밀 번호가 틀렸습니다\n다시 입력해주세요'}
          </Text>
        )}
      </View>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <View style={{ width: '100%', height: '10%', alignItems: 'center' }}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Text
          style={{
            // fontFamily: 'SpoqaHanSansNeo-Medium',
            color: 'rgba(198, 199, 193, 1)',
            textAlign: 'center'
          }}
        >
          {'학사 번호가 기억이 나지 않을 경우\n행정실에 문의하세요'}
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    // fontFamily: 'BMJUA',
    fontSize: 32,
    marginLeft: 8
  },
  input: {
    // fontFamily: 'SpoqaHanSansNeo-Medium',
    fontSize: 14,
    width: '75%',
    height: 48,
    marginLeft: 44,
    marginRight: 44,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#B9CCB4',
    paddingLeft: 16
  },
  // @ts-expect-error TS(2322): Type '({ pressed }: any) => { width: string; heigh... Remove this comment to see the full error message
  CTAbutton: ({
    pressed
  }: any) => {
    return [
      {
        width: '75%',
        height: 48,
        marginTop: 20,
        marginBottom: 15,
        backgroundColor: pressed ? 'rgb(234, 243, 230)' : '#00A551',
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    ]
  },
  CTAtext: {
    // fontFamily: 'SpoqaHanSansNeo-Medium',
    color: 'white'
  },
  error: {
    // fontFamily: 'SpoqaHanSansNeo-Medium',
    marginTop: 14,
    color: '#BA1A1A'
  }
})

export default LoginScreen
