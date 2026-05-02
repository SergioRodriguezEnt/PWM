import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';

export interface Notification {
  id: string;
  userId: string;
  message: string;
  outfitId?: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService extends CrudService<Notification>{
  constructor() { super('notifications') }
}
