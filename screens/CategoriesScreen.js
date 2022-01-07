import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from "../components/HeaderButton";
import CategoryGridTile from '../components/CategoryGridTile';
import { CATEGORIES } from "../data/dummy-data";

function CategoriesScreen({ navigation }) {
  const renderGridItem = (item) => {
    return (
      <CategoryGridTile 
        title={item.title} 
        color={item.color}
        onSelect={() => {
          navigation.navigate({ 
            routeName: "CategoryMeals", 
            params: {
              categoryId: item.id
            }
          })
        }} 
      />
    );
  }

  return (
    <FlatList 
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => renderGridItem(item)}
    />
  );
}

CategoriesScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Meal Categories",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title="Menu" 
          iconName="ios-menu" 
          onPress={() => {navigationData.navigation.toggleDrawer()}} 
        />
      </HeaderButtons>
    )
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})

export default CategoriesScreen;