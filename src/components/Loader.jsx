import React from 'react';
import '../asset/SearchBar.css';

function Loader({ isLoading = false }) {
  if (isLoading) {
    return (
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Loader;
