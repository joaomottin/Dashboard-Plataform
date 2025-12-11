import axios from 'axios';
import { APIConnection } from '../types';

class APIService {
  private connections: Map<string, APIConnection> = new Map();

  registerConnection(connection: APIConnection) {
    this.connections.set(connection.id, connection);
  }

  async fetchData(connectionId: string, query?: string): Promise<any> {
    const connection = this.connections.get(connectionId);
    
    if (!connection) {
      throw new Error(`Connection ${connectionId} not found`);
    }

    try {
      const response = await axios({
        method: 'GET',
        url: connection.endpoint,
        params: query ? { query } : undefined,
        ...connection.config,
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${connectionId}:`, error);
      throw error;
    }
  }

  async postData(connectionId: string, data: any): Promise<any> {
    const connection = this.connections.get(connectionId);
    
    if (!connection) {
      throw new Error(`Connection ${connectionId} not found`);
    }

    try {
      const response = await axios({
        method: 'POST',
        url: connection.endpoint,
        data,
        ...connection.config,
      });

      return response.data;
    } catch (error) {
      console.error(`Error posting data to ${connectionId}:`, error);
      throw error;
    }
  }
}

export const apiService = new APIService();
