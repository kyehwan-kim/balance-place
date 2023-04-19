import React, { useContext, useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarCategory, setSidebarCategory] = useState();
  const [wantMyLocation, setWantMyLocation] = useState(false);
  const [endPoint, setEndPoint] = useState('');

  const openSidebar = (sidebarCategory) => {
    setIsSidebarOpen(true);
    setSidebarCategory(sidebarCategory);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isNeedMyLocation = () => {
    setWantMyLocation((cur) => !cur);
  };

  const changeEndPoint = () => {
    setEndPoint((cur) => window.localStorage.getItem('END_POINT'));
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        sidebarCategory,
        wantMyLocation,
        endPoint,
        openSidebar,
        closeSidebar,
        isNeedMyLocation,
        changeEndPoint,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
