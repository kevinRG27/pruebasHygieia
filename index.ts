import {saveNewOwner, getOwnersOfDashboard } from "./src/rest/putOwner";
import { generateUrlOwnersAPI, getDashboardId, getUsername, validateUrlDashboard } from "./src/util/regexUris";
import { OwnerDashboard } from "./src/interfaces/hygieia";
import { Constants } from "./src/constants/constants";

export async function run(){
    try{

        console.log("*****STARTING OPERATION...****");

        const dashboardUrl = "https://devops.apps.bancolombia.com/#/dashboard/5bbe3671e4b068a0a832c953";
        if (validateUrlDashboard(dashboardUrl)) {

            const dashboardId: string = getDashboardId(dashboardUrl);

            const urlOwnersAPI: string = generateUrlOwnersAPI(dashboardId);
            const owners: OwnerDashboard[] = await getOwnersOfDashboard(urlOwnersAPI);
            console.log('OWNERS: ');
            console.log(owners);

            const owner : OwnerDashboard = {
                username: Constants.USER,
                authType: 'LDAP'
            }
            console.log('Customizer Owner: ', owner)
            if (owners.some(owner1 => owner1.username == owner.username)) {
                console.log('The mobilizer already owns the board.');
            } else {
                owners.push(owner);
                await saveNewOwner(urlOwnersAPI, owners);
                console.log('Mobilizer saved as dashboard owner succesfully.');
            }
        } else {
            throw new Error(`Invalid dashboard url: ${this.extensionParameters.urlDashboard}.`);
        }
        
    }catch(error){
        console.error(error.message);
    }
}

run();