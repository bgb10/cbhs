import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

import QRCode from 'react-native-qrcode-svg';

const regex = /makeCode\('(\d+)'\)/;

const QRScreen = () => {
  const [code, setCode] = useState('test');
  const [lastUpdatedTimeStamp, setLastUpdatedTimeStamp] = useState(Date.now());
  const [isFontLoaded, error] = useFonts({
    'SpoqaHanSansNeo-Medium': require('../../assets/fonts/SpoqaHanSansNeo-Medium.otf')
  });


  const updateLastUpdatedTimeStamp = () => {
    const now = new Date(Date.now());
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const formattedDate = `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} ${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    setLastUpdatedTimeStamp(formattedDate);
  }

  // QR 코드를 발급하는 코드는 학사번호 + MM + SS 로 구성
  // 1초 안에 여러번 Reload 버튼을 눌러도 코드가 발급 코드가 그대로이기 때문에 QR 코드는 바뀌지 않는다.
  const loadQR = () => {
    fetch('http://115.92.96.29:8080/employee/loginProc.jsp', {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      referrer: 'http://115.92.96.29:8080/employee/login.jsp',
      body: 'USER_ID=202051&USER_PW=001028&SAVE_PW=on',
      method: 'POST',
      mode: 'cors'
    })
      .then((res) => res.text())
      .then((text) => text.match(regex))
      .then((e) => setCode((before) => e[1]));

    updateLastUpdatedTimeStamp();
  }

  useEffect(() => {
    loadQR();
    // console.log(Dimensions.get('screen').width);
  }, [])

  if(!isFontLoaded){
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.QRcontainer, styles.shadow]}>
        <QRCode size={Dimensions.get('screen').width * 0.50} value={`${code}`} />
      </View>
      <Text style={{fontFamily:'SpoqaHanSansNeo-Medium', fontSize: 14, marginTop: 12, marginBottom: 24}}>{`발급 날짜: ${lastUpdatedTimeStamp}`}</Text>
      <View style={[styles.shadow]}>
      <TouchableOpacity 
        style={styles.buttonReload}
        onPress={loadQR}
        >
        <Image 
          style={{width: 25, height: 25}}
          source={require('../../assets/refresh.png')}
        />
      </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height * 0.66,
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center'
  },
  QRcontainer: {
    width: Dimensions.get('screen').width * 0.66,
    height: Dimensions.get('screen').width * 0.66,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#FAFAFA"
  },
  shadow: Platform.OS === 'ios'
    ? {
      shadowColor: 'black',
      shadowOffset: {
        width: -2,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5,
    } : {
      elevation: 20,
      shadowColor: 'black'
    },
  buttonReload: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#00A551",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default QRScreen;