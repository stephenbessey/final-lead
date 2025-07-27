import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from '../types';

const STORAGE_KEYS = {
  USER_DATA: '@leadgen_user_data',
  ZIP_CODE: '@leadgen_zip_code',
} as const;

export class SettingsService {
  private static instance: SettingsService;
  
  private constructor() {}
  
  static getInstance(): SettingsService {
    if (!SettingsService.instance) {
      SettingsService.instance = new SettingsService();
    }
    return SettingsService.instance;
  }

  async saveUserData(userData: UserData): Promise<void> {
    try {
      const serializedData = JSON.stringify(userData);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, serializedData);
      
      if (userData.zipCode) {
        await this.saveZipCode(userData.zipCode);
      }
    } catch (error) {
      console.error('Failed to save user data:', error);
      throw new Error('Failed to save settings');
    }
  }

  async loadUserData(): Promise<UserData | null> {
    try {
      const serializedData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (!serializedData) return null;
      
      const userData = JSON.parse(serializedData) as UserData;
      
      if (!userData.zipCode) {
        const zipCode = await this.loadZipCode();
        if (zipCode) {
          userData.zipCode = zipCode;
        }
      }
      
      return userData;
    } catch (error) {
      console.error('Failed to load user data:', error);
      return null;
    }
  }

  async saveZipCode(zipCode: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ZIP_CODE, zipCode);
    } catch (error) {
      console.error('Failed to save zip code:', error);
      throw new Error('Failed to save zip code');
    }
  }

  async loadZipCode(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.ZIP_CODE);
    } catch (error) {
      console.error('Failed to load zip code:', error);
      return null;
    }
  }

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.ZIP_CODE,
      ]);
    } catch (error) {
      console.error('Failed to clear data:', error);
      throw new Error('Failed to clear settings');
    }
  }

  async updatePartialData(partialData: Partial<UserData>): Promise<void> {
    try {
      const existingData = await this.loadUserData();
      const updatedData = existingData 
        ? { ...existingData, ...partialData }
        : partialData as UserData;
      
      await this.saveUserData(updatedData);
    } catch (error) {
      console.error('Failed to update partial data:', error);
      throw new Error('Failed to update settings');
    }
  }
}