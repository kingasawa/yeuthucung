// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Image } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
//
// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }
//
//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);
//
//   const anotherLocation = {
//     latitude: 10.762622,
//     longitude: 106.660172, // Thay bằng tọa độ của địa điểm bạn muốn hiển thị
//   };
//
//   return (
//     <View style={styles.container}>
//       {location && (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker
//             coordinate={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//             }}
//             title="Vị trí của tôi"
//           />
//           <Marker
//             coordinate={anotherLocation}
//             title="Địa điểm khác"
//           >
//             <Image
//               source={{ uri: 'https://avatars.githubusercontent.com/u/137318798?v=4' }}
//               style={{ width: 30, height: 30, borderRadius: 25 }}
//             />
//           </Marker>
//         </MapView>
//       )}
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });
