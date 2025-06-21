
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

interface User {
  id: string;
  name: string;
  deviceId: string;
  ipAddress: string;
  joinDate: string;
  status: 'active' | 'banned';
  downloads: number;
}

export class UserManager {
  private static readonly USER_KEY = 'app_user_data';
  private static readonly DEVICE_ID_KEY = 'app_device_id';

  static generateDeviceId(): string {
    return 'DEV' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  static async getIPAddress(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Failed to get IP address:', error);
      return 'Unknown';
    }
  }

  static getDeviceId(): string {
    let deviceId = localStorage.getItem(this.DEVICE_ID_KEY);
    if (!deviceId) {
      deviceId = this.generateDeviceId();
      localStorage.setItem(this.DEVICE_ID_KEY, deviceId);
    }
    return deviceId;
  }

  static async saveUser(name: string): Promise<User> {
    const deviceId = this.getDeviceId();
    const ipAddress = await this.getIPAddress();
    
    const user: User = {
      id: Date.now().toString(),
      name,
      deviceId,
      ipAddress,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      downloads: 0
    };

    // Save locally
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    try {
      // Save to Firebase
      await addDoc(collection(db, 'users'), {
        ...user,
        createdAt: new Date()
      });
      console.log('User saved to Firebase:', user);
    } catch (error) {
      console.error('Failed to save user to Firebase:', error);
    }
    
    return user;
  }

  static getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static isFirstTimeUser(): boolean {
    return !this.getUser();
  }

  static incrementDownloads(): void {
    const user = this.getUser();
    if (user) {
      user.downloads++;
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      
      // Update Firebase
      this.updateUserInFirebase(user);
    }
  }

  static async updateUserInFirebase(user: User): Promise<void> {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('deviceId', '==', user.deviceId));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach(async (document) => {
        await updateDoc(doc(db, 'users', document.id), {
          downloads: user.downloads,
          status: user.status
        });
      });
    } catch (error) {
      console.error('Failed to update user in Firebase:', error);
    }
  }

  static isUserBanned(): boolean {
    const user = this.getUser();
    return user?.status === 'banned' || false;
  }

  static async banUser(deviceId: string): Promise<void> {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('deviceId', '==', deviceId));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach(async (document) => {
        await updateDoc(doc(db, 'users', document.id), {
          status: 'banned'
        });
      });
    } catch (error) {
      console.error('Failed to ban user in Firebase:', error);
    }
  }
}
