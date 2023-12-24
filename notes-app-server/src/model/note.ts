import {Model} from 'sequelize-typescript';

export default interface Note {
    id: number;
    title:string;
    content:string
  }