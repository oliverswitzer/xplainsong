import axiosLib from 'axios'

const axiosConfig = {
  baseURL: '/api/v1',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
};

export const axios = axiosLib.create(axiosConfig);