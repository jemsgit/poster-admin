import React, { FC, useContext } from 'react';
import { IRootStore } from '../../services/store/root-stotre';
import { store as realStore } from '../../services/storeAdapter';

export const Context = React.createContext<IRootStore | null>(null);

// eslint-disable-next-line prefer-destructuring
export const Provider = Context.Provider;

export function useStore(mapStateToProps?: (state: IRootStore) => any): IRootStore | any | null {
  const store = useContext(Context);

  if (typeof mapStateToProps !== 'undefined') {
    return mapStateToProps(store);
  }

  return store;
}

// eslint-disable-next-line arrow-body-style
export const StoreProvider: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (<Provider value={realStore}>{children}</Provider>);
};
