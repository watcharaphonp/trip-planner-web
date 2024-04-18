"use client";

import { Provider } from "react-redux";
import { userStore, userPersistor } from "../reduxs/user/store";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={userStore}>
      <PersistGate loading={null} persistor={userPersistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
