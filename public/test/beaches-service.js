'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000';


class BeachService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + '/api/users', newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/users/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl+'/api/users/authenticate', user);
      return response.data;
    } catch (e) {
      return null;
    }
  }


  async getBeaches() {
    const response = await axios.get(this.baseUrl + '/api/beaches');
    return response.data;
  }

  async getBeach(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/beaches/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async createBeach(newBeach){
    const response = await axios.post(this.baseUrl + '/api/beaches', newBeach);
    return response.data;
  }

  async deleteAllBeaches() {
    const response = await axios.delete(this.baseUrl + '/api/beaches');
    return response.data;
  }

  async deleteOneBeach(id) {
    const response = await axios.delete(this.baseUrl + '/api/beaches/' + id);
    return response.data;
  }

  async createCheckIn(newCheckIn){
    const response = await axios.post(this.baseUrl + '/api/checkIn', newCheckIn);
    return response.data;
  }

  async getCheckIns(id){
    try{
      const response = await axios.get(this.baseUrl + '/api/checkIns');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllCheckIns() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/checkIns');
      return response.data;
    } catch (e) {
      return null;
    }
  }

}


module.exports = BeachService;