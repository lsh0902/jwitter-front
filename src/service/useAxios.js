import axios from 'axios';

export default class MyAxios { 
    constructor(base, storage, authErrorEventBus) {
        this.base = base;
        this.storage = storage;
        this.instance = axios.create({
            baseURL : base,
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : this.storage.get()
            },
            withCredentials : true,
        });
        this.authErrorEventBus = authErrorEventBus;
    }

    async fetch(url, options) {
        console.log('dddd');
        return this.instance(`${url}`,{
            ...options            
          }).then(res => {
            console.log(res.data);
            return res.data;
          }).catch(this.isExpired);
    }

    async fetchPost(url, options) {
        return this.instance.post(`${this.base}${url}`, {
            ...options
        })
    }

    async fetchPut(url, options) {
        return this.instance.put(`${this.base}${url}`, {
            ...options
        });
    }

    async fetchDelete(url, options) {
        return this.instance.delete(`${this.base}${url}`, {
            ...options
        })
    }

    isExpired = (e) => {
        if(e.response.status === 401) {
          console.log(this)
          this.authErrorEventBus.notify(e);
          return;
        }
      }
}