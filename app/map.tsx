import React, {useEffect, useRef, useState} from 'react';
import MapView, { Marker } from 'react-native-maps';
import {StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import {XStack, YStack, Input, Button} from "tamagui";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {LocationObjectCoords} from "expo-location/src/Location.types";
import { Link, useRouter } from "expo-router";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import {Search} from "@tamagui/lucide-icons";

export default function App() {
  const router = useRouter();
  const [location, setLocation] = useState<LocationObjectCoords>();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>(null);
  const [markers, setMarkers] = useState([]);
  const [search, setSearch] = useState('');
  const mapRef = useRef(null);

  const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [{ color: 'yellow' }],
    },
    {
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: 'red' }],
    },
    // Thêm các kiểu khác ở đây
  ];

  useEffect(() => {
    (async () => {
      // Yêu cầu quyền truy cập vị trí
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Lấy vị trí hiện tại
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const searchLocation = async () => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: search,
          key: 'YOUR_GOOGLE_MAPS_API_KEY', // Thay thế bằng khóa API thực tế
        },
      });

      const results = response.data.results;
      const newMarkers = results.map(place => ({
        title: place.formatted_address,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      }));

      setMarkers(newMarkers);
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => {
    router.replace('/')
  }

  const handleLocateMe = async () => {
    setLoading(true);
    try {
      let loc = await Location.getLastKnownPositionAsync({});
      setLocation(loc.coords);
      if (mapRef.current && loc.coords) {
        mapRef.current.animateToRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }, 500); // Thay đổi thời gian về 200ms
        setLoading(false);
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  let text = 'Đang tải vị trí...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <XStack style={styles.mapHeader}>
        <Button
          zIndex={1}
          position="absolute"
          top={0}
          left={-10}
          size="$5"
          icon={<MaterialIcon name="place" size={30}/>}
          backgroundColor='transparent'
          color="black"
        />
        <Input
          height={50}
          paddingLeft={55}
          placeholder='Searchword'
          flex={1}
          focusStyle={{
            backgroundColor: 'rgba(0,0,0,0.25)'
          }}
          borderWidth="$0"
          backgroundColor='rgba(59,59,59,0.25)'
          borderRadius='$8'
        />
        <Button
          zIndex={1}
          position="absolute"
          top={0}
          right={0}
          size="$5"
          icon={<MaterialIcon name="search" size={30}/>}
          backgroundColor='transparent'
          color="black"
        />
        {/*<Button title="Back" onPress={goBack} />*/}
      </XStack>
      {location ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          customMapStyle={mapStyle}
          mapType='none'
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsPointsOfInterest={false}
          userInterfaceStyle="light"
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={"Vị trí của tôi"}
          >
            <Image
              source={require('@/assets/images/account-circle.png')}
              style={{ width: 20, height: 30 }} // Thay đổi kích thước tại đây
            />
            <View style={{backgroundColor: "red", padding: 10}}>
              <Text>Me</Text>
            </View>
          </Marker>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
            />
          ))}
        </MapView>
      ) : (
        <Text>{text}</Text>
      )}
      <YStack gap="$1" style={styles.tool}>
        <TouchableOpacity onPress={handleLocateMe}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <MaterialIcons name="my-location" size={50} color="white" />
          )}
        </TouchableOpacity>
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    zIndex: -9999,
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white'
  },
  mapHeader: {
    marginTop: 50,
    marginHorizontal: 10,
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderRadius: 15,
    backgroundColor: 'rgba(204,204,204,0.53)',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
  },
  tool: {
    position: 'absolute',
    bottom: 60,
    right: 30,
    backgroundColor: 'rgba(35,35,35,0.5)',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

