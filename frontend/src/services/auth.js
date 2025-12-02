import ApiService from './api';

class AuthService {
  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem('user');
  }

  async login(credentials) {
    try {
      const response = await ApiService.login(credentials);
      if (response.token) {
        this.setToken(response.token);
        this.setUser(response.user);
        return response;
      }
      throw new Error('No token received');
    } catch (error) {
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await ApiService.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.removeToken();
    this.removeUser();
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();