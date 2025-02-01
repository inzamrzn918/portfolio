import axios from 'axios';

interface RequestData {
  timestamp: string;
  userAgent: string;
  referrer: string | null;
  path: string;
  metadata?: {
    [key: string]: any;
  };
  ip_address: string;
}

interface ClietnIp{
    ip: string;
}

interface RequestResponse {
  id: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiService = {
  async storeRequestData(data: any): Promise<RequestResponse> {
    console.log('data', data);
    
    try {
      const response = await axios.post<RequestResponse>(
        `${API_URL}/store_request_data`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error storing request data:', error);
      throw error;
    }
  },

  async getRequestData(): Promise<RequestData[]> {
    try {
      const response = await axios.get<RequestData[]>(
        `${API_URL}/get_request_data`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching request data:', error);
      throw error;
    }
  },

  async getClientIp(): Promise<string> {
    try {
        const response = await axios.get<ClietnIp>(
          `${API_URL}/get_client_ip`
        );
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching request data:', error);
        throw error;
    }
  }
};

export default apiService;