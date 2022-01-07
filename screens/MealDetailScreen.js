import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from "../components/HeaderButton";
import DefaultText from '../components/DefaultText';
import colors from '../constants/colors';
import { toggleFavorite } from '../store/actions/mealsAction';

const ListItem = ({ item }) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{item}</DefaultText>
    </View>
  );
}

function MealDetailScreen({ navigation }) {
  const mealId = navigation.getParam("mealId");
  const availableMeals = useSelector(state => state.meals.meals);
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);
  const currentMealIsFav = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id = mealId));

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    navigation.setParams({toggleFav: toggleFavoriteHandler});
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    navigation.setParams({isFav: currentMealIsFav});
  }, [currentMealIsFav]);

  return (
    <ScrollView>
      <Image  
        style={styles.image}
        source={{ uri: selectedMeal.imageUrl}}
      />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}min</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient =>
        <ListItem key={ingredient} item={ingredient} />
      )}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step =>
        <ListItem key={step} item={step} />
      )}
    </ScrollView>
  );
}

MealDetailScreen.navigationOptions = (navData) => {
  const mealTitle = navData.navigation.getParam("mealTitle");
  const toggleFavorite = navData.navigation.getParam("toggleFav");
  const isFavorite = navData.navigation.getParam("isFav");

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title="Favourite" 
          iconName={isFavorite ? "heart" : "heart-outline"} 
          onPress={toggleFavorite} 
        />
      </HeaderButtons>
    )
  };
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.light,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center"
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: colors.grey,
    borderWidth: 1,
    padding: 10
  }
})

export default MealDetailScreen;