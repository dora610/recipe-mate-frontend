import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function CustomLinks({ to, children, ...props }) {
  const resolve = useResolvedPath(to);
  const match = useMatch({ path: resolve.pathname, end: true });

  const navlinkClassActive =
    'bg-purple-600 text-white px-3 py-1 rounded-xl font-medium';

  const navlinkClassDefault = 'hover:text-fuchsia-700';

  return (
    <>
      <Link
        to={to}
        className={match ? navlinkClassActive : navlinkClassDefault}
        {...props}
      >
        {children}
      </Link>
    </>
  );
}

export default CustomLinks;
