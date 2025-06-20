
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

    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    // In a real app, you would send this to your backend
    console.log('User saved:', user);
    
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
    }
  }

  static isUserBanned(): boolean {
    const user = this.getUser();
    return user?.status === 'banned' || false;
  }
}
