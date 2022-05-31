import { Injectable } from '@angular/core';
import { parseLocalStorageTokenToJSON } from 'src/app/shared/utils/decodeJwt';

type RoleTypes =
  | 'asg'
  | 'trader'
  | 'financing'
  | 'fdt'
  | 'tm'
  | 'support'
  | 'nbim';
interface IUserRoles {
  roles: RoleTypes[];
}

@Injectable({
  providedIn: 'root',
})
export class UserTokenService {
  constructor() {}

  restrictResourceBasedOnUserRole(users: IUserRoles): boolean {
    if (localStorage.getItem('userToken') === null) return false;

    const { roles } = users;
    const parsedStorageItem = parseLocalStorageTokenToJSON('userToken');
    let rolePropertyExist =
      parsedStorageItem.decodedAccessToken.hasOwnProperty('roles');

    if (!rolePropertyExist) {
      return false;
    } else {
      const parsedRoles = parsedStorageItem.decodedAccessToken.roles;
      const isInRole = parsedRoles.some((role: any) => roles.includes(role));
      return isInRole;
    }
  }

  getAccessToken(): string {
    const parsedStorageItem = parseLocalStorageTokenToJSON('userToken');
    return parsedStorageItem.accessToken;
  }
  getTokenExpiryOn(): number {
    const parsedStorageItem = parseLocalStorageTokenToJSON('userToken');
    return parsedStorageItem.expiresOn;
  }

  getUserName(): string {
    const parsedStorageItem = parseLocalStorageTokenToJSON('userToken');
    const parsedName = parsedStorageItem.decodedAccessToken.name;
    return parsedName;
  }
  tokenExpired(): boolean {
    const parsedStorageItem = parseLocalStorageTokenToJSON('userToken');
    const now = new Date();
    const expiryDateTime = new Date(parsedStorageItem.expiresOn);
    if (expiryDateTime < now) {
      return true;
    }
    return false;
  }
  stringifyAccessToken(token: string): string {
    return JSON.stringify(token).slice(1, -1);
  }
}
