import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';

export interface User {
  id: string;
  email: string;
  description: string;
  name: string;
  profileSrc: string;
  role: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class UserService extends CrudService<User>{
  constructor() { super('users') }

  override create(data: Omit<User, "id">, id: string): Promise<string> {
    return super.create(data, id);
  }
}
