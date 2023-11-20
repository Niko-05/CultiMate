import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { profilePictures } from "../utils/user";
import { CommonActions } from "@react-navigation/native";
import { changeProfilePicture } from "../api/user";

function ProfilePicture({ route, navigation }) {
  const { profilePictureId } = route.params;
  const [id, setId] = useState(profilePictureId);

  const handlePress = (id) => {
    setId(id);
  };

  const handleSave = async () => {
    await changeProfilePicture(id);
    navigation.dispatch(CommonActions.goBack());
  };

  const renderAchievement = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="justify-center items-center m-[3]"
        onPress={() => handlePress(index + 1)}
      >
        {id === index + 1 ? (
          <View className="border-2 border-blue-500 rounded-md">
            <Image source={item.imageSource} className="w-[90] h-[90] m-[5]" />
          </View>
        ) : (
          <View className="border-2 border-white">
            <Image source={item.imageSource} className="w-[90] h-[90] m-[5]" />
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View className="bg-white m-2 p-2">
        <FlatList
          data={profilePictures}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={renderAchievement}
          contentContainerStyle={styles.gridContainer}
        />
      </View>
      <TouchableOpacity
        className="bg-blue-500 rounded-md m-2 p-2"
        onPress={() => handleSave()}
      >
        <Text className="text-center text-white text-lg">Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ProfilePicture;
