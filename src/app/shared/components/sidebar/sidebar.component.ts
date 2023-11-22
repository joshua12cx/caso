import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSubmenuVisible: boolean = false;

  constructor(private renderer: Renderer2) {}

  toggleSubmenu(): void {
    this.isSubmenuVisible = !this.isSubmenuVisible;

    const submenu = document.querySelector(".sub-options__menu");
    if (submenu) {
      if (this.isSubmenuVisible) {
        this.renderer.addClass(submenu, "show");
      } else {
        this.renderer.removeClass(submenu, "show");
      }
    }
  }
}
