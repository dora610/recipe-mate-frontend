import axios from 'axios';
import { DateTime } from 'luxon';
import React, { useRef } from 'react';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { MdRefresh } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../backend';
import { useAdminContent } from '../../context/adminContentContext';
import useAuth from '../../hooks/useAuth';
import handleHttpErrorResp from '../../utils/handleErrorResponse';
import ActionBtn from './ActionBtn';
import CollectionTable from './CollectionTable';

function RecipeTable() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { content, setContent } = useAdminContent();

  let recipes = content.recipeData ? content.recipeData.recipes : [];

  const tableheaderRef = useRef([
    'Sr. no.',
    'Name',
    'Rating',
    'Type',
    'Created By',
    'Created at',
    'Updated at',
    'Action',
  ]);

  if (!recipes.length) {
    return <h3 className="text-stone-500">No recipe found</h3>;
  }

  const insertHandler = () => {
    navigate('/admin/recipe/add');
  };

  const deleteHandler = (id) => {
    setContent({ ...content, isLoading: true, error: null });
    axios({
      url: `${API}/admin/recipe/${id}`,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user['jwt']}`,
        auth: user.userId,
      },
    })
      .then((response) => {
        toast.success(response.data.status);
        return axios({
          url: `${API}/admin/recipe/all`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user['jwt']}`,
            auth: user.userId,
          },
        });
      })
      .then((response) => {
        setContent({
          ...content,
          isLoading: false,
          recipeData: response.data,
        });
      })
      .catch((err) =>
        setContent({
          ...content,
          isLoading: false,
          error: handleHttpErrorResp(err),
        })
      );
  };

  const refreshHandler = () => {
    //
  };

  return (
    <>
      <div className="flex space-x-4 items-center">
        <h3 className="text-xl font-semibold mb-2">Recipes</h3>
        <MdRefresh
          className="fill-purple-600 text-xl"
          onClick={refreshHandler}
        />
        <HiOutlineDocumentAdd
          className="stroke-green-700 hover:fill-green-200"
          onClick={insertHandler}
        />
      </div>
      <CollectionTable
        headers={tableheaderRef.current}
        className="grid-cols-[2rem_2fr_repeat(2,_1fr)_repeat(3,_2fr)_auto]"
      >
        {recipes.map((recipe, index) => (
          <React.Fragment key={index}>
            <div className="cell">{index + 1}</div>
            <div className="cell">{recipe?.name}</div>
            <div className="cell">{recipe?.rating}</div>
            <div className="cell">{recipe?.type}</div>
            <div className="cell">{recipe?.createdBy?.fullName}</div>
            <div className="cell">
              {DateTime.fromISO(recipe?.createdAt).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </div>
            <div className="cell">
              {DateTime.fromISO(recipe?.updatedAt).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </div>
            <ActionBtn
              updateHandler={() => navigate(`/admin/recipe/${recipe._id}`)}
              deleteHandler={() => deleteHandler(recipe._id)}
            />
          </React.Fragment>
        ))}
      </CollectionTable>
    </>
  );
}

export default RecipeTable;
