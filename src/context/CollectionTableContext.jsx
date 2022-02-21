import { createContext, useContext, useState } from 'react';

const CollectionTableContext = createContext();

const CollectionTableProvider = (props) => {
  const [tableData, setTableData] = useState({});
  let defaultValue = { tableData, setTableData };
  return <CollectionTableContext.Provider value={defaultValue} {...props} />;
};

const useCollectionTable = () => {
  const context = useContext(CollectionTableContext);
  if (!context) {
    throw new Error(
      'useCollectionTable must be called inside CollectionTableProvider'
    );
  }
  return context;
};

export { CollectionTableProvider, useCollectionTable };
