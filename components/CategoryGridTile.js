import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

function CategoryGridTile({ title, color, onSelect}) {
  let Touchable = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback;
  }

  return (
    <View style={styles.gridItem} >
      <Touchable style={{ flex: 1 }} onPress={onSelect}>
        <View style={[ styles.container, {backgroundColor: color} ]}>
          <Text style={styles.title} numberOfLines={2} >
            {title}
          </Text>
        </View>
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: Platform.OS === "android" && Platform.Version >=21 ? "hidden": "visible",
    elevation: 7,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "right",
  }
})

export default CategoryGridTile;