import { HygieiaInstance } from '../hygieia/client';
import { OwnerDashboard } from '../interfaces/hygieia';
import axios from 'axios';

export async function saveNewOwner(urlOwnersAPI: string, owners: OwnerDashboard[]): Promise<OwnerDashboard[]> {
    try {
      console.log('Saving new owner...');
      const hygieiaInstance: HygieiaInstance = await HygieiaInstance.getInstance();
      const header: any = hygieiaInstance.getHeader();
      const newOwners = await axios.put(urlOwnersAPI, owners, header)
        .then((response) => {
          return response.data as Array<OwnerDashboard>;
        });
      return newOwners;
    } catch (error) {
      throw new Error(error.message);
    }
  }

export async function getOwnersOfDashboard(urlOwnersAPI: string): Promise<OwnerDashboard[]> {
try {
    console.log('Getting owners of dashboard...');
    const hygieiaInstance: HygieiaInstance = await HygieiaInstance.getInstance();
    const header: any = hygieiaInstance.getHeader();
    console.log('Header: ',header)

    const owners = await axios.get(urlOwnersAPI, header)
    .then((response) => {
        return response.data as Array<OwnerDashboard>;
    });
    return owners;
} catch (error) {
    throw new Error(error.message);
}
}