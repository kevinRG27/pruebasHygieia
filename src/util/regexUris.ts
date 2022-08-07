import { Constants } from '../constants/constants';

export function validateUrlDashboard(urlDashboard: string): boolean {
    const regex = new RegExp(/^https\:\/\/devops.apps.bancolombia.com\/#\/dashboard\/\/*[a-z 0-9]{24}$/gi);
    return regex.test(urlDashboard);
}

export function getUsername(user: string): string {
    const split: string[] = user.split('@');
    const username: string = split[0];
    return username.toLowerCase();
}

export function getDashboardId(urlDasboard: string): string {
    const url: string[] = urlDasboard.split("/");
    const dashboardId: string = url[url.length - 1];
    return dashboardId.toLowerCase();
}

export function generateUrlOwnersAPI(dashboardId: string): string {
    const url: string = Constants.urlApiOwnersDashboard;
    return url.replace('{dashboardId}', dashboardId);
}