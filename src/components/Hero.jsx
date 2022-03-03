import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Hero() {
  return (
    <div className="hero text-center py-6 sm:mx-8 mx-2">
      <h1 className="text-3xl capitalize font-semibold leading-relaxed mb-4 text-slate-800">
        Amazing recipes waiting to be tried out
      </h1>
      <h3 className="text-base font-light text-slate-200">
        Best Place to learn and share recipes
      </h3>
      <h3 className="text-3xl leading-relaxed mb-4 text-fuchsia-200">
        Get your recipe today
      </h3>
      <SearchBar />
    </div>
  );
}

export default Hero;
