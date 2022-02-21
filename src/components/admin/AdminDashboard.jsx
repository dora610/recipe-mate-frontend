import React from 'react';
import { API } from '../../backend';
import RecipeTable from '../../components/admin/RecipeTable';
import UserTable from '../../components/admin/UserTable';
import { useAdminContentAll } from '../../context/adminContentContext';
import MainDash from './MainDash';
import MetricsCard from './MetricsCard';

function AdminDashboard() {
  const { content } = useAdminContentAll([
    `${API}/admin/user/all`,
    `${API}/admin/recipe/all`,
  ]);

  let { isLoading, error, userData, recipeData } = content;

  if (isLoading) {
    return <h3 className="text-warn">Loading...</h3>;
  }

  if (error) {
    return <h3 className="error-card">{error}</h3>;
  }

  return (
    <div className="grid gap-5 grid-cols-4 place-content-center py-4">
      <MainDash />
      <MetricsCard content={'recipes'} count={recipeData?.count} />
      <MetricsCard content={'users'} count={userData?.count} />

      <div className="col-span-full">
        <UserTable />
      </div>
      <div className="col-span-full">
        <RecipeTable />
      </div>
    </div>
  );
}

export default AdminDashboard;
