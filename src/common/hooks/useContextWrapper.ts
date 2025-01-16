import React, { useContext } from 'react';

interface IConfig {
  contextName: string;
  providerName: string;
}

export const useContextWrapper = <T>(ReactContext: React.Context<T>, config: IConfig): NonNullable<T> => {
  const context = useContext(ReactContext);
  const { contextName, providerName } = config;

  if (!context) {
    throw new Error(`${contextName} must be used whthin a ${providerName}`);
  }

  return context;
};
