import { authApi } from '@/apis/authApi';
import { useAuthStore } from '@/stores/authStore';

export const authController = {
  login: async (email: string, password: string) => {
    try {
      // Call the API
    //   const data = await authApi.login(email, password);
    // Simulating API response with dummy data
    if(email !=='admin@gujarat.in' || password !== 'admin') throw new Error('Invalid credentials');

    
    const data = {
        user: {
            id: '1',
            email: 'user@example.com',
            name: 'John Doe',
            role: 'user',
            createdAt: new Date().toISOString()
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTE2MjM5MDIyfQ"
    };
      
      // Update the store with user data and token
      useAuthStore.getState().login(data.user, data.token);
      
    // Store token in an HttpOnly cookie instead (requires backend support)
    // For now using localStorage, but this has security implications
    // TODO: Consider using HttpOnly cookies or a more secure token storage approach
    localStorage.setItem('token', data.token);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to login' 
      };
    }
  },
  
  logout: async () => {
    try {
      // Call API to invalidate token on server
      await authApi.logout();
    
      // Clear auth state
      useAuthStore.getState().logout();
      
      // reset all state in localStorage
      localStorage.clear();

      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even if API fails, we should clean up local state
      useAuthStore.getState().logout();
      localStorage.removeItem('token');
      
      return { success: true };
    }
  }
};