import axios from "axios";
export default class AuthService {

  constructor(base, storage) {
    this.base = base;
    this.instance = axios.create({
    })
    this.storage = storage;
  }

  async login(username, password) {
    console.log(this.base, '로 login 요청');
    const result = await this.instance.post(`${this.base}/auth/login`, { username, password }).then(res => res.data).catch(console.log);
    this.storage.save(result.token);
    console.log(this.storage.get(), '토큰 세팅!');
    return result;
  }

  async me() {
    console.log(this.base, '로 me 요청');
    return await this.instance.get(`${this.base}/auth/me`).then(res => res.data);
  }

  async logout() {
    this.storage.clear();
  }

  async signup(username, password, name, email, url) {
    console.log(this.base, '로 signup 요청');
    return await this.instance.post(`${this.base}/auth/signup`, {
      username,
      password,
      name,
      email,
      url
    }).then(res => res.data);
  }
}
