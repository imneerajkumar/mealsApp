import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from "./MealItem";

function MealList({ listData, navigation}) {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  const renderMealItem = (item) => {
    const isFavorite = favoriteMeals.some(meal => meal.id === item.id);
    return (
      <MealItem
        meal={item}
        onSelectMeal={() => { 
          navigation.navigate({
            routeName: "MealDetail",
            params: {
              mealId: item.id,
              mealTitle: item.title,
              isFav: isFavorite
            }
          })
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList 
        style={{ width: "100%"}}
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderMealItem(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
})

export default MealList;