import { Component, Input, ContentChild, ElementRef, Renderer, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { TerminalService, QueueItem } from './terminal.service';

@Component({
  selector: 'terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit{  
  constructor(private elt:ElementRef, private renderer:Renderer, private terminal: TerminalService) {
  }
  
  async ngOnInit(){
    this.readItem(this.elt.nativeElement);
    await this.terminal.run();
  }

  readItem(target, parent=null){
    if(target.nodeType == 3){
      this.terminal.EnqueueTask(new QueueItem(
        target.data,
        target,
        parent,
        this.renderer
      ));
    }
    for(var i = 0; i < target.childNodes.length; i++){
      this.readItem(target.childNodes[i], target);
    }
  }
}
