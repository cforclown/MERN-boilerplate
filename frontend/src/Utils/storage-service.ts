export type StorageType = 'local' | 'session'
export interface IStorageService {
  getItem: (key: string) => any;
  setItem: (key: string, value: any) => void;
}

const storageService = (type: StorageType): IStorageService => {
  const storageType: 'localStorage' | 'sessionStorage' = `${type ?? 'local'}Storage`;
  return {
    getItem: (key: string): any => {
      const value = window[storageType].getItem(key);
      return value && JSON.parse(value);
    },
    setItem: (key: string, value: any): void => {
      window[storageType].setItem(key, JSON.stringify(value));
    },
  };
};

export default storageService;
