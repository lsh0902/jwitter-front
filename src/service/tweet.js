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