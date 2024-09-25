import {
  Button,
  Card,
  Input,
  Paragraph,
  Sheet,
  XStack,
  Image,
  H4,
  Form,
  YStack,
  Label,
  RadioGroup, Spinner, H5, TextArea
} from "tamagui";
import { useState } from "react";
import { Replace } from "@tamagui/lucide-icons";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
export function AIConfigModal() {
  return <DialogInstance />
}

interface ContextType {
  me: string,
  ai: string,
  gender: string,
  context: string,
}

function DialogInstance() {
  const spModes = ['percent', 'constant', 'fit', 'mixed'] as const;
  const [position, setPosition] = useState(2);
  const [open, setOpen] = useState(true);
  const [modal, setModal] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [snapPointsMode, setSnapPointsMode] =
    useState<(typeof spModes)[number]>('percent');
  const [formData, setFormData] = useState<ContextType>({
    me: '',
    ai: '',
    gender: 'Nam',
    context: '',
  });

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={modal}
      open={true}
      snapPoints={[95, 45, 15]}
      snapPointsMode={snapPointsMode}
      dismissOnSnapToBottom={false}
      position={position}
      onPositionChange={setPosition}
      zIndex={100_000}
      animation="medium"
    >
      <Sheet.Handle alignSelf="center" style={{ backgroundColor: 'white', borderWidth: 1, top: 25, width: 50 }} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Sheet.Frame
          style={{backgroundColor: 'rgb(34,34,34)'}}
          paddingTop={15}
          alignItems="center"
          gap="$1"
        >
          <YStack padding={10} gap="$4" alignItems="center">
            <XStack style={styles.mapHeader}>
              <Button
                zIndex={1}
                position="absolute"
                top={7}
                left={0}
                size="$2"
                icon={<MaterialIcon name="place" size={20}/>}
                backgroundColor='transparent'
                color="gray"
              />
              <Input
                height={40}
                paddingLeft={35}
                placeholder='Tìm kiếm'
                placeholderTextColor="#999"
                flex={1}
                focusStyle={{
                  backgroundColor: 'rgb(91,91,91)'
                }}
                backgroundColor='rgb(91,91,91)'
                borderRadius='$5'
                onBlur={Keyboard.dismiss}
                onFocus={() => setPosition(0)}
              />
              <Button
                zIndex={1}
                position="absolute"
                top={7}
                right={0}
                size="$2"
                icon={<MaterialIcon name="search" size={25}/>}
                backgroundColor='transparent'
                color="gray"
              />
            </XStack>
          </YStack>
        </Sheet.Frame>
      </TouchableWithoutFeedback>
    </Sheet>
  )
}

const styles = StyleSheet.create({
  mapHeader: {
    marginHorizontal: 10,
    justifyContent: 'center'
  },
});