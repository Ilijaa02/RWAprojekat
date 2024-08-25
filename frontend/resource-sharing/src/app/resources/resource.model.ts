export enum ResourceType {
  PREDMET = 'predmet',
  VESTINA = 'vestina',
  PROSTOR = 'prostor',
}

export interface Resource {
  id?: number;
  name: string;
  description: string;
  type: ResourceType;
  createdAt?: Date;
  user?: any;
}