export default class TweetService {
  constructor(axios, socket) {
    this.axios = axios;
    this.socket = socket;
  }

  async getTweets(username = '') {
    console.log('new get');
    const options = {
        method : 'get',
        params : {
        user : username || ''
      }
    }
    return await this.axios.fetch('/tweets', options);
  }

  async postTweet(text) {
    const options = {
      id: Date.now(),
      createdAt: new Date(),
      text
    }
    return await this.axios.fetchPost('/tweets', options)
  }

  async deleteTweet(tweetId) {
    const options = {
      id : tweetId
    }
    await this.axios.fetchDelete(`/tweets/${tweetId}`, options)
  }

  async updateTweet(tweetId, text) {
    const options = {
      text,
      tweetId,
    }
    return await this.axios.fetchPut(`/tweets/${tweetId}`, options);
  }

  onSync(callback) {
    return this.socket.onSync('tweets', callback);
  }
}



// import axios from 'axios';
// export default class TweetService {
//   constructor(base, storage, authErrorEventBus, socket) {
//     this.base = base;
//     this.storage = storage
//     this.instance = axios.create({
//       headers : {
//         'Content-Type' : 'application/json',
//       'Authorization' : this.storage.get()},
//       withCredentials : true,
//     });
    
//     this.authErrorEventBus = authErrorEventBus;
//     this.socket = socket;
//   }

//   async getTweets(username = '') {
//     console.log(this.base, '로 get Tweet', this.storage.get());
//     return await this.instance.get(`${this.base}/tweets`,{
//         params : {
//           user : username || ''
//         }
//       }).then(res => {
//         console.log(res.data);
//         return res.data;
//       }).catch(this.isExpired);
//   }

//   async postTweet(text) {
//     console.log(this.base, '로 post Tweet');
//     return await this.instance.post(`${this.base}/tweets`,{
//         id: Date.now(),
//         createdAt: new Date(),
//         userId : 1,
//         text
//       }).then(res => {
//       console.log('eeeee')
//       console.log(res.data);
//       return res.data;
//     }).catch(e => {
//       console.log(e);
//       this.isExpired(e)
//     });
//   }

//   async deleteTweet(tweetId) {
//     console.log(this.base, '로 delete Tweet');
//     await this.instance.delete(`${this.base}/tweets/${tweetId}`, {
//         id : tweetId
//       }).then(console.log);
//   }

//   async updateTweet(tweetId, text) {
//     console.log(this.base, '로 update Tweet');
//     return await this.instance.put(`${this.base}/tweets/${tweetId}`, {
//         text,
//         tweetId,
//       }).then(res => res.data);
//   }

//   isExpired = (e) => {
//     if(e.response.status === 401) {
//       console.log(this)
//       this.authErrorEventBus.notify(e);
//       return;
//     }
//   }

//   onSync(callback) {
//     return this.socket.onSync('tweets', callback);
//   }
// }