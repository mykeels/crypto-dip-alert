import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default key => {
  const [storageItem, setStorageItem] = useState(null);

  const getStorageItem = useCallback(async () => {
    const data = await AsyncStorage.getItem(key);
    setStorageItem(JSON.parse(data));
  }, [key]);

  const updateStorageItem = (data) => {
    AsyncStorage.setItem(key, JSON.stringify(data));
    setStorageItem(data);
  }

  const clearStorageItem = () => {
    AsyncStorage.removeItem(key);
    setStorageItem(null);
  }

  useEffect(() => {
    getStorageItem();
  }, [getStorageItem]);

  return [storageItem, updateStorageItem, clearStorageItem];
};
