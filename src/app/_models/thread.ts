import { Time } from '@angular/common';

export class Thread{
    title: string;
    description: string;
    tags: string[];
    owner: string;
    createdAt: Time;
}