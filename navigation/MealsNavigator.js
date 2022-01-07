import React from "react";
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import colors from '../constants/colors';

const defaultStackNavOps = {
  headerStyle: { 
    backgroundColor:  Platform.OS === "android" ? colors.primary : colors.white
  },
  headerTitleStyle: { 
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? colors.white : colors.primary
};

const MealsNavigator =  createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: CategoryMealsScreen,
  MealDetail: MealDetailScreen
  }, {
    defaultNavigationOptions: defaultStackNavOps
  }
);

const FavNavigator = createStackNavigator({
  Favorites: FavouritesScreen,
  MealDetail: MealDetailScreen
  }, {
    defaultNavigationOptions: defaultStackNavOps
  }  
);

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, {
  defaultNavigationOptions: defaultStackNavOps
});

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />},
      tabBarColor: colors.primary,
      tabBarLabel: Platform.OS === "android" ? <Text style={{fontFamily: "open-sans-bold"}}>Meals</Text> : "Meals"
    }
  },  
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {return <Ionicons name="heart" size={25} color={tabInfo.tintColor} />},
      tabBarColor: colors.accent,
      tabBarLabel: Platform.OS === "android" ? <Text style={{fontFamily: "open-sans-bold"}}>Favorites</Text> : "Favorites"
    }
  }
}

const MealsFavTabNavigator = Platform.OS === "android" 
  ? createMaterialBottomTabNavigator(tabScreenConfig, {
    shifting: true,
    activeColor: colors.white,
  }) 
  : createBottomTabNavigator(tabScreenConfig, {
      tabBarOptions: { 
        labelStyle: {
          fontFamily: "open-sans"
        },
        activeTintColor: colors.accent
      }
    }
);

const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator
}, {
  hideStatusBar: true,
  drawerWidth: "50%",
  statusBarAnimation: "slide",
  drawerType: "slide",
  contentOptions: {
    activeTintColor: colors.accent,
    activeBackgroundColor: colors.primary,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
});

export default createAppContainer(MainNavigator);