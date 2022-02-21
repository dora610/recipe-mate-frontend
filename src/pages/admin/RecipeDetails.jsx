import React from 'react';
import { Outlet } from 'react-router-dom';
import RecipeTable from '../../components/admin/RecipeTable';

function RecipeDetails() {
  return (
    <div>
      <RecipeTable />
      <Outlet />
    </div>
  );
}

export default RecipeDetails;
