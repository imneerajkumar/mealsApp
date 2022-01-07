import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux'

import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';
import { CATEGORIES } from "../data/dummy-data";

function CategoryMealsScreen({ navigation }) {
  const catId = navigation.getParam("categoryId");
  const availableMeals = useSelector(state => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No Meals found, maybe check your filters.</DefaultText>
      </View>
    );
  }

  return (
    <MealList listData={displayedMeals} navigation={navigation} />    
  );
}

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default CategoryMealsScreen;