import { useEffect, useState, useCallback } from 'react';
import { AsyncStorage } from 'react-native';

export default key => {
  const [storageItem, setStorageItem] = useState(null);

  const getStorageItem = useCallback(async() => {
    const data = await AsyncStorage.getItem(key);
    setStorageItem(JSON.parse(data));
  }, [key]);

  function updateStorageItem(data) {
    AsyncStorage.setItem(key, data);
    setStorageItem(JSON.stringify(data));
  }

  function clearStorageItem() {
    AsyncStorage.removeItem(key);
    setStorageItem(null);
  }

  useEffect(() => {
    getStorageItem();
  }, [getStorageItem]);

  return [storageItem, updateStorageItem, clearStorageItem];
};
