import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../backend';
import recipeContext from '../context/recipeContext';
import useAuth from '../hooks/useAuth';
import handleHttpErrorResp from '../utils/handleErrorResponse';

function AddRecipe() {
  const { user, isUserAuthenticated } = useAuth();
  const [state, dispatch] = useContext(recipeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isUpdateRecipe, setIsUpdateRecipe] = useState(false);
  const location = useLocation();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [course, setCourse] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [ingrArr, setIngrArr] = useState([]);
  const [steps, setSteps] = useState([]);
  const ingrRef = useRef('');
  const stepsRef = useRef('');
  const imgRef = useRef('');

  useEffect(() => {
    if (location.state?.from === 'showRecipe') {
      setName(state.recipe.name);
      setDesc(state.recipe.description);
      setType(state.recipe.type);
      setCourse(state.recipe.course);
      setPrepTime(state.recipe.preparationTime);
      setCookTime(state.recipe.cookTime);
      setIngrArr(state.recipe.ingredients);
      setSteps(state.recipe.steps);
      imgRef.current = state.recipe.photo.square;
      setIsUpdateRecipe(true);
    } else {
      setIsUpdateRecipe(false);
    }
  }, [location.state]);

  const typeOptionRef = useRef(['veg', 'non-veg']);
  const courseOptionRef = useRef([
    'main-course',
    'starter',
    'dessert',
    'snacks',
    'beverages',
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const formEle = document.querySelector('form');
    const formData = new FormData(formEle);

    // format ingredient values & steps for form data
    formData.set('ingredients', JSON.stringify(ingrArr));
    formData.set('steps', JSON.stringify(steps));

    let invalidInput = validFormInputs(formData);
    if (invalidInput) {
      setError(invalidInput);
      return;
    }
    isUpdateRecipe ? updateRecipeHandler(formData) : addRecipeHandler(formData);
  };

  const validFormInputs = (formData) => {
    console.groupCollapsed('form data');
    if (ingrArr.length < 1) return 'Ingredient must be added';
    if (steps.length < 1) return 'Steps are missing';
    for (const [key, val] of formData.entries()) {
      console.log(key, val);
      if (key !== 'photo') {
        if ((Array.isArray(val) && val.length() < 1) || !val) {
          return `${key} is missing`;
        }
      }
    }
    if (!formData.get('name')) return 'Name is not present';
    if (!formData.get('type')) return 'Valid type must be selected';
    if (!formData.get('course')) return 'Valid course must be selected';
    if (formData.get('preparationTime') < 1)
      return 'Enter valid preparation time';
    if (formData.get('cookTime') < 1) return 'Enter valid cooking time';
    if (!formData.get('ingredients')) return 'Ingredients not added';
    if (!formData.get('steps')) return 'Steps are required';

    console.groupEnd('form data');
  };

  const addRecipeHandler = (formData) => {
    const { userId, jwt } = user;
    setError('');
    setIsLoading(true);
    axios
      .post(`${API}/recipe`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          auth: userId,
        },
      })
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        toast.success(res.data.status);
        // navigate to home or show recipe page
      })
      .catch((err) => setError(handleHttpErrorResp(err)))
      .finally(() => setIsLoading(false));
  };

  const updateRecipeHandler = (formData) => {
    const { userId, jwt } = user;
    setError('');
    setIsLoading(true);
    axios
      .put(`${API}/recipe/${state.recipe._id}`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          auth: userId,
        },
      })
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        toast.success(res.data.status);
        // navigate to home or show recipe page
      })
      .catch((err) => setError(handleHttpErrorResp(err)))
      .finally(() => setIsLoading(false));
  };

  const fileUplaodHandler = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file.type.includes('image')) {
      setError('Incorrect file type, only jpg/png/jpeg files are allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeded, max limit 5mb');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (e) => {
      imgEle.setAttribute('src', e.target.result);
    });

    const imgEle = document.querySelector('.preview-section .thumbnail img');
    showFileInfo(file.name, file.size);
  };

  const showFileInfo = (fileName, fileSize) => {
    document.querySelector('.preview-section .file-name > span').textContent =
      fileName;
    document.querySelector('.preview-section .file-size > span').textContent =
      getFormattedFileSize(fileSize);
  };

  const getFormattedFileSize = (sizeInBytes) => {
    let units = ['kb', 'mb', 'gb', 'tb'];
    let formattedSize = '';
    let i = sizeInBytes;
    let j = 0;

    while (i > 1024 && j < 4) {
      i = parseFloat(i / 1024).toFixed(2);
      formattedSize = `${i} ${units[j]}`;
      j++;
    }
    return formattedSize;
  };

  const addIngredient = (e) => {
    e.stopPropagation();
    const ingr = ingrRef.current.value;
    if (ingr) {
      setIngrArr([...ingrArr, ingr]);
      ingrRef.current.value = '';
    }
  };
  const addSteps = (e) => {
    e.stopPropagation();
    const step = stepsRef.current.value;
    if (step) {
      console.log(step);
      setSteps([...steps, step]);
      stepsRef.current.value = '';
    }
  };

  const deleteStep = (e, id) => {
    e.stopPropagation();
    const newSteps = steps.filter((s, index) => index !== id);
    setSteps([...newSteps]);
  };

  const deleteIngr = (e, id) => {
    e.stopPropagation();
    const newIngrArr = ingrArr.filter((i, index) => index !== id);
    setIngrArr([...newIngrArr]);
  };

  return (
    <div className="bg-fuchsia-50/50 py-4">
      <div className="form-card-wide">
        <h2 className="form-card-title">
          {isUpdateRecipe ? 'Update Recipe' : 'Add Recipe'}
        </h2>
        {error && (
          <div className="text-danger">
            <p>{error}</p>
          </div>
        )}
        {isLoading && (
          <div className="text-warn">
            <p>Loading...</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="my-6 py-4 text-base font-normal w-full text-slate-700 border-t-2 border-fuchsia-200 capitalize flex flex-col items-center justify-between gap-6"
          encType="multipart/form-data"
        >
          <div className="grid lg:grid-rows-[7] lg:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-2 lg:grid-flow-col items-start">
            <div className="photo-section px-2 lg:col-start-1 lg:row-start-1 lg:row-end-7 lg:row-span-[7] row-span-6">
              <div className="preview-section">
                <div className="thumbnail mb-7 shadow-lg h-80 rounded-md">
                  <img
                    src={isUpdateRecipe ? imgRef.current : ''}
                    alt="Upload recipe photo"
                    className="flex justify-center items-center bg-gray-100 text-slate-400 object-cover w-full h-full rounded-md"
                  />
                </div>
                <p className="file-name">
                  filename: <span className="text-slate-500"></span>
                </p>
                <p className="file-size">
                  filesize: <span className="text-slate-500"></span>
                </p>
              </div>
              <input
                type="file"
                name="photo"
                id="photo"
                onChange={fileUplaodHandler}
                className="file-upload-input"
              />
            </div>

            <div className="flex flex-col justify-start">
              <label htmlFor="name" className="">
                Recipe Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="input-normal"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-start h-36">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                cols="20"
                rows="3"
                className="col-span-3 px-4 py-2 mt-3 rounded-lg border-stone-200 bg-fuchsia-50 hover:bg-stone-100/50 hover:border-fuchsia-200 focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>

            <div className="grid grid-cols-2 items-center">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                id="type"
                className="input-normal"
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="" disabled>
                  choose type
                </option>
                {typeOptionRef.current.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 items-center">
              <label htmlFor="course">Course</label>
              <select
                name="course"
                id="course"
                className="input-normal"
                required
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="" disabled>
                  choose course
                </option>
                {courseOptionRef.current.map((e, index) => (
                  <option key={index} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 items-center">
              <label htmlFor="preparationTime">Preparation Time in min</label>
              <input
                type="number"
                name="preparationTime"
                id="preparationTime"
                className="input-normal"
                required
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 items-center">
              <label htmlFor="cookTime">Cook Time in min</label>
              <input
                type="number"
                name="cookTime"
                id="cookTime"
                className="input-normal"
                required
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
              />
            </div>

            <div className="lg:row-span-2 row-span-3  items-baseline">
              <label htmlFor="ingredients">Ingredients</label>
              <div className="grid lg:grid-cols-4 grid-cols-[minmax(8rem,_1fr)_3rem] gap-2 items-center">
                <input
                  type="text"
                  name="ingredients"
                  id="ingredients"
                  ref={ingrRef}
                  className="input-normal lg:col-span-3"
                />
                <button
                  className="bg-fuchsia-100 rounded-xl  h-10 text-center group  hover:text-white hover:bg-fuchsia-500"
                  onClick={addIngredient}
                  type="button"
                >
                  <FaPlus className="fill-fuchsia-400 h-4 mx-auto group-hover:fill-white" />
                </button>
              </div>
              {ingrArr.length > 0 && (
                <ul className="w-full row-span-3 flex flex-wrap gap-2 bg-gray-200/50 px-4 py-4 rounded-md max-h-32 overflow-y-auto my-2">
                  {ingrArr.map((i, index) => (
                    <li
                      key={index}
                      className="min-card-blocks flex justify-between items-baseline gap-2 hover:cursor-pointer"
                    >
                      <h5>{i}</h5>
                      <button
                        type="button"
                        onClick={(e) => deleteIngr(e, index)}
                      >
                        <FaRegTrashAlt className="fill-red-400 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="lg:row-span-3 row-span-4 lg:h-64 min-h-44 max-h-80">
              <label htmlFor="steps">Steps</label>
              <div className="grid lg:grid-cols-4 grid-cols-[minmax(8rem,_1fr)_3rem] gap-2 items-start">
                <textarea
                  name="steps"
                  id="steps"
                  rows="3"
                  ref={stepsRef}
                  className="input-normal lg:col-span-3"
                ></textarea>
                <button
                  type="button"
                  className="bg-fuchsia-100 rounded-xl mt-2 h-10 text-center group  hover:text-white hover:bg-fuchsia-500"
                  onClick={addSteps}
                >
                  <FaPlus className="fill-fuchsia-400 h-4 mx-auto group-hover:fill-white" />
                </button>
              </div>
              <div className="max-h-48 bg-gray-200/50 rounded-lg overflow-y-auto">
                {steps.map((s, index) => (
                  <details
                    key={index}
                    className="text-slate-900 open:bg-white open:shadow-xl open:rounded-lg open:my-2 px-4 py-2 mx-2"
                  >
                    <summary className="text-sm leading-7 font-semibold select-none marker:text-fuchsia-600">
                      <span>Step {index + 1}</span>
                      <button
                        type="button"
                        className="ml-4"
                        onClick={(e) => deleteStep(e, index)}
                      >
                        <FaRegTrashAlt className="fill-red-400 h-3" />
                      </button>
                    </summary>
                    <p className="text-slate-700 leading-6 text-sm py-2 ">
                      {s}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {(function () {
            let btnLable = isLoading
              ? 'in progress...'
              : isUpdateRecipe
              ? 'Update Recipe'
              : 'Add Recipe';
            return (
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-1/3 disabled:bg-yellow-500"
              >
                {btnLable}
              </button>
            );
          })()}
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
