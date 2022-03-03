import axios from 'axios';
import { DateTime } from 'luxon';
import React, { useEffect, useRef, useState } from 'react';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../backend';
import { useAdminContent } from '../../context/adminContentContext';
import useAuth from '../../hooks/useAuth';
import NotFound from '../../pages/NotFound';
import { getFormattedFileSize } from '../../utils/fileUploadUtil';
import handleHttpErrorResp from '../../utils/handleErrorResponse';

function RecipeForm() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [course, setCourse] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [rating, setRating] = useState('');
  const [ingrArr, setIngrArr] = useState([]);
  const [steps, setSteps] = useState([]);
  const [createdBy, setCreatedBy] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isUpdateRecipe, setIsUpdateRecipe] = useState(false);
  const [ingr, setIngr] = useState('');
  const [step, setStep] = useState('');
  const [createdAt, setCreatedAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  const [userList, setUserList] = useState([]);
  const typeOptionRef = useRef(['veg', 'non-veg']);
  const courseOptionRef = useRef([
    'main-course',
    'starter',
    'dessert',
    'snacks',
    'beverages',
  ]);

  const { content, setContent } = useAdminContent();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { recipeId } = useParams();

  if (!recipeId) {
    return <NotFound />;
  }

  useEffect(() => {
    let selectedRecipe = content.recipeData?.recipes.filter(
      (recipe) => recipe._id === recipeId
    )[0];
    if (selectedRecipe) {
      setName(selectedRecipe?.name);
      setDesc(selectedRecipe?.description);
      setType(selectedRecipe?.type);
      setCourse(selectedRecipe?.course);
      setPrepTime(selectedRecipe?.preparationTime);
      setCookTime(selectedRecipe?.cookTime);
      setRating(selectedRecipe?.rating);
      setCreatedBy(selectedRecipe?.createdBy);
      setIngrArr(selectedRecipe?.ingredients);
      setSteps(selectedRecipe?.steps);
      setPhotoUrl(selectedRecipe?.photo.secure_url);
      setCreatedAt(selectedRecipe?.createdAt);
      setUpdatedAt(selectedRecipe?.updatedAt);
      setIsUpdateRecipe(true);
    }
  }, []);

  useEffect(() => {
    setUserList(content.userData?.users);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setContent({ ...content, error: null });

    const formEle = document.querySelector('form');
    const formData = new FormData(formEle);

    // format ingredient values & steps for form data
    formData.set('ingredients', JSON.stringify(ingrArr));
    formData.set('steps', JSON.stringify(steps));

    let invalidInput = validFormInputs(formData);
    if (invalidInput) {
      setContent({ ...content, error: invalidInput });
      return;
    }
    isUpdateRecipe ? updateRecipeHandler(formData) : addRecipeHandler(formData);
  };

  const validFormInputs = (formData) => {
    if (ingrArr.length < 1) return 'Ingredient must be added';
    if (steps.length < 1) return 'Steps are missing';
    for (const [key, val] of formData.entries()) {
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
    if (!formData.get('createdBy')) return 'User is not selected';
    if (!formData.get('rating')) return 'Please provide valid rating';
  };

  const updateRecipeHandler = (formData) => {
    const { userId, jwt } = user;
    setContent({ ...content, isLoading: true, error: null });

    axios
      .put(`${API}/admin/recipe/${recipeId}`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          auth: userId,
        },
      })
      .then((res) => {
        toast.success(res.data.status);
        setContent({ ...content, isLoading: false });
      })
      .catch((err) =>
        setContent({
          ...content,
          isLoading: false,
          error: handleHttpErrorResp(err),
        })
      );
  };

  const addRecipeHandler = (formData) => {
    const { userId, jwt } = user;
    setContent({ ...content, isLoading: true, error: null });

    axios
      .post(`${API}/admin/recipe`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          auth: userId,
        },
      })
      .then((res) => {
        setContent({ ...content, isLoading: false });
        toast.success(res.data.status);
      })
      .catch((err) =>
        setContent({
          ...content,
          isLoading: false,
          error: handleHttpErrorResp(err),
        })
      );
  };

  const fileUplaodHandler = (e) => {
    setContent({ ...content, error: null });
    const file = e.target.files[0];
    if (!file.type.includes('image')) {
      setContent({
        ...content,
        error: 'Incorrect file type, only jpg/png/jpeg files are allowed',
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setContent({ ...content, error: 'File size exceeded, max limit 5mb' });
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

  const addIngredient = (e) => {
    e.stopPropagation();
    if (ingr && !ingr.includes(',')) {
      setIngrArr([...ingrArr, ingr]);
      setIngr('');
    }
  };
  const addSteps = (e) => {
    e.stopPropagation();
    if (step && !step.includes(',')) {
      setSteps([...steps, step]);
      setStep('');
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
    <div>
      {content.isLoading && <h3 className="text-warn">Loading...</h3>}
      {content.error && <h3 className="error-card">{content.error}</h3>}
      <div className="grid grid-cols-3 justify-items-center items-center mt-4">
        <button
          className="justify-self-start border-2 border-fuchsia-400 hover:bg-fuchsia-400 group hover:text-white px-2 py-1 rounded-md flex gap-2 items-center justify-evenly"
          onClick={() => {
            navigate('/admin/recipe');
          }}
        >
          <MdOutlineKeyboardBackspace className="fill-stone-800 group-hover:fill-white" />
          Back
        </button>
        <h3 className="text-2xl font-semibold">
          {isUpdateRecipe ? 'Update user' : 'Add user'}
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="my-6 py-4 text-sm font-normal text-slate-700 border-t-2 border-fuchsia-200 capitalize flex flex-col justify-center"
        encType="multipart/form-data"
      >
        <div className="grid lg:grid-cols-3 gap-x-8 gap-y-4 grid-col-1">
          <div className="photo-section">
            <div className="preview-section text-slate-400">
              <div className="thumbnail mb-7 shadow-lg h-80 rounded-md">
                <img
                  src={isUpdateRecipe ? photoUrl : ''}
                  alt="Upload recipe photo"
                  className="flex justify-center items-center bg-gray-100 object-cover w-full h-full rounded-md"
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
            <div className="py-4">
              {createdAt && (
                <div>
                  <p>created at:</p>
                  <p className="text-slate-500 ml-4">
                    {DateTime.fromISO(createdAt).toLocaleString(
                      DateTime.DATETIME_FULL_WITH_SECONDS
                    )}
                  </p>
                </div>
              )}
              {updatedAt && (
                <div>
                  <p>updated at:</p>
                  <span className="text-slate-500 ml-4">
                    {DateTime.fromISO(updatedAt).toLocaleString(
                      DateTime.DATETIME_FULL_WITH_SECONDS
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-4 items-baseline gap-x-6 gap-y-6">
            <label htmlFor="name" className="">
              Recipe Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="input-sm col-span-3"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols="20"
              rows="3"
              className="col-span-3 rounded-lg border-stone-200 bg-fuchsia-50 hover:bg-stone-100/50 hover:border-fuchsia-200"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>

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

            <label htmlFor="createdBy">Created By</label>
            <select
              name="createdBy"
              id="createdBy"
              className="input-normal"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
            >
              <option value="" disabled>
                Select user
              </option>
              {userList &&
                userList.map((user, index) => (
                  <option value={user._id} key={index}>
                    {user.fullName}
                  </option>
                ))}
            </select>

            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              name="rating"
              id="rating"
              className="input-normal"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />

            <div className="col-span-2 row-span-2">
              <label htmlFor="ingredients">Ingredients</label>
              <div className="grid lg:grid-cols-4 grid-cols-[minmax(8rem,_1fr)_3rem] gap-2 items-center">
                <input
                  type="text"
                  name="ingredients"
                  id="ingredients"
                  value={ingr}
                  onChange={(e) => setIngr(e.target.value)}
                  className="input-sm lg:col-span-3"
                />
                <button
                  className="bg-fuchsia-100 rounded-full p-2 text-center group  hover:text-white hover:bg-fuchsia-500"
                  onClick={addIngredient}
                  type="button"
                >
                  <FaPlus className="fill-fuchsia-400 h-4 mx-auto group-hover:fill-white" />
                </button>
              </div>
              {ingrArr?.length > 0 && (
                <ul className="w-full row-span-3 flex flex-wrap gap-2 bg-gray-200/50 px-2 py-2 rounded-md max-h-32 overflow-y-auto my-2">
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

            <div className="col-span-2 row-span-2 min-h-44 max-h-80">
              <label htmlFor="steps">Steps</label>
              <div className="grid lg:grid-cols-4 grid-cols-[minmax(8rem,_1fr)_3rem] gap-2 items-start">
                <textarea
                  name="steps"
                  id="steps"
                  rows="3"
                  value={step}
                  onChange={(e) => setStep(e.target.value)}
                  className="input-normal lg:col-span-3"
                ></textarea>
                <button
                  type="button"
                  className="bg-fuchsia-100 rounded-full mt-2 p-2 text-center group  hover:text-white hover:bg-fuchsia-500"
                  onClick={addSteps}
                >
                  <FaPlus className="fill-fuchsia-400 h-4 mx-auto group-hover:fill-white" />
                </button>
              </div>
              <div className="max-h-48 bg-gray-200/50 rounded-lg overflow-y-auto">
                {steps?.length > 0 &&
                  steps.map((s, index) => (
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
            let btnLable = content.isLoading
              ? 'in progress...'
              : isUpdateRecipe
              ? 'Update Recipe'
              : 'Add Recipe';
            return (
              <button
                type="submit"
                disabled={content.isLoading}
                className="btn-primary lg:col-start-2 disabled:bg-yellow-500"
              >
                {btnLable}
              </button>
            );
          })()}
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;
