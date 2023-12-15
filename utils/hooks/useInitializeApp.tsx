import { useState, useEffect } from 'react';
import sleep from '../sleep';
import * as storage from '../storage';
import { useAppDispatch } from '../../store/hooks';
import { changeLanguage } from '../../store/slices/i18n/i18nSlice';
import {setUser} from "../../store/slices/user/userSlice";
import {User} from "../../constants/interfaces/user";

export const useInitializeApp = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const dispatch = useAppDispatch();


  const initializeConfig = async () => {
    await sleep(2000);
    const language = await storage.loadString('language')
    const userData = await storage.load('userData');
    if (language) {
      dispatch(changeLanguage(language));
    }
    if (userData) {
      dispatch(setUser(userData as User));
    }
    setIsReady(true);
};

  useEffect(() => {
    initializeConfig();
  }, []);

  return {isReady};
};
