import React from 'react';

export const CurrentUserContext = React.createContext({
    onSavedPage: false,
    setOnSavedPage: () => { },
});