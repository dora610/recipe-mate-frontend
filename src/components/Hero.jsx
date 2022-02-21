import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero text-center py-6 mx-8">
      <h1 className="text-3xl capitalize font-semibold leading-relaxed mb-4 text-slate-800">
        Amazing recipes waiting to be tried out
      </h1>
      <h3 className="text-base font-light text-slate-200">
        Best Place to learn and share recipes
      </h3>
      <div className="flex justify-center gap-4 my-4 flex-wrap">
        <button className="btn-hero">
          <Link to="recipe/addrecipe">Add Recipe</Link>
        </button>
        <button className="btn-hero">Find new recipe</button>
      </div>
    </div>
  );
}

export default Hero;
