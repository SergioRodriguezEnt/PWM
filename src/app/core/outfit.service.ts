import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';

export interface Outfit {
  id: string;
  userId: string;
  title: string;
  description: string;
  src: string;
  tags: string[];
}

@Injectable({ providedIn: 'root' })
export class OutfitService extends CrudService<Outfit>{
  constructor() { super('outfits') }
}

