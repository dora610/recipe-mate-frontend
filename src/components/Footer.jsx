import React from 'react';

function Footer({ className }) {
  return (
    <footer
      className={`${className} footer shadow-md px-5 py-2 text-center text-gray-500 text-lg bg-white bg-opacity-60 backdrop-blur-lg`}
    >
      Contact us @RecipeMate
    </footer>
  );
}

export default Footer;
