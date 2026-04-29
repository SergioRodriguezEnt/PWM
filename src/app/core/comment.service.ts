import {Injectable} from '@angular/core';
import {CrudService} from './crud.service';

export interface Comment {
  id: string;
  outfitId: string;
  userId: string;
  comment: string;
}

@Injectable({ providedIn: 'root' })
export class CommentService extends CrudService<Comment>{
  constructor() { super('comments') }
}
