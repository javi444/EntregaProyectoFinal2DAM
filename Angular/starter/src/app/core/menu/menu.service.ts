import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'inicio',
    name: 'Centros',
    type: 'link',
    icon: 'account_balance'
  },
  {
    state: 'lista-pistas',
    name: 'Pistas',
    type: 'link',
    icon: 'storage'
  }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu) {
    MENUITEMS.push(menu);
  }
}
