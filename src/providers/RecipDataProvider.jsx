import React, { useReducer } from 'react';
import RecipeContext from '../context/recipeContext';
import recipeDataReducer from '../context/recipeDataReducer';

function RecipDataProvider({ children }) {
  let initialRecipeState = {
    recipe: null,
    isLoading: false,
    error: null,
  };

  const recipeReducer = useReducer(recipeDataReducer, initialRecipeState);

  return (
    <RecipeContext.Provider value={recipeReducer}>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipDataProvider;
