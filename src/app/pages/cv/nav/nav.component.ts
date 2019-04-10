import { Component, OnInit, OnDestroy } from '@angular/core';
import { TerminalService } from 'src/app/shared';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  constructor(private terminal: TerminalService) { 

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.terminal.skip();
  }

}
