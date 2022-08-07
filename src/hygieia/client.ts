import axios from 'axios';
import { Constants } from '../constants/constants'
const qs = require('qs');

export class HygieiaInstance {
  private static instance: HygieiaInstance;

  private header: any;

  private constructor(header: any) {
    this.header = header;
  }

  private static async generateHeader(): Promise<any> {
    const username: string =  Constants.USER;
    const password: string = Constants.TOKEN;
    const data = qs.stringify({username: `${username}`, password: `${password}`, grant_type: 'password'});
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const token = await axios.post(Constants.urlLoginLdapHygieia, data,
      {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
      ).then((response) => {
          return response.headers['x-authentication-token'] as string;
          }).catch((error) => {
            console.log('Failed to authenticate in Hygieia.');
            throw new Error(error.message);
          });
    const header: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    return header;
  }

  public static async getInstance(): Promise<HygieiaInstance> {
    if (!HygieiaInstance.instance) {
      HygieiaInstance.instance = new HygieiaInstance(await this.generateHeader());
    }
    return HygieiaInstance.instance;
  }

  public getHeader(): any {
    return this.header;
  }
}
