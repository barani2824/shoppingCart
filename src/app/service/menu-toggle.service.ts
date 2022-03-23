import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class MenuToggleService {
    private drawer: MatDrawer;

    public setDrawer(drawer: MatDrawer) {
       this.drawer = drawer;
    }

    public open() {
       return this.drawer.open();
    }

    public close() {
       return this.drawer.close();
    }

    public toggle(): void {
       this.drawer.toggle();
    }
}