import { Models } from 'react-native-appwrite';

export interface Document extends Models.Document {}

export type DatabaseMap = {
  [key: string]: {
    [key: string]: Document;
  };
};
