import { Component, Input, ContentChild, ElementRef, Renderer, AfterViewInit, ViewChild } from '@angular/core';
import { TerminalService, QueueItem } from './terminal.service';

@Component({
  selector: 'terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements AfterViewInit {  
  @Input() 
  displayCursor: boolean = true;

  @Input()
  writeDelay = 50;

  @ContentChild(TerminalComponent)
  element: any;
  
  textToWrite = [];

  target: any;
  propertyKey: any;
  isFlushed = false;

  constructor(private elt:ElementRef, private renderer:Renderer, private terminal: TerminalService) {
  }

  onClick(){
    this.isFlushed = true;
  }

  get cursorClass(){
    return this.displayCursor == true?'cursor':'';
  }
  
  async ngAfterViewInit() {
    // await this.readItem(this.elt.nativeElement);
    await this.readElement(this.elt.nativeElement);
    for(var i = 0; i< this.textToWrite.length; i++){
      let t = this.textToWrite[i];
      this.setTarget(t.target, t.propKey);
      if(this.displayCursor)
      this.renderer.setElementClass(t.parent, 'cursor', true);
      await this.write(t.text);
      if(i+1 < this.textToWrite.length)
        this.renderer.setElementClass(t.parent, 'cursor', false);
    }
    // await this.terminal.run();
  }

  async readElement(target, parent=null){
    if(target.nodeType == 3){
      this.textToWrite.push({
        text: target.data,
        target,
        parent,
        propKey: 'textContent'
      })
      
      this.setTarget(target);
      await this.clearScreen();
    }
    for(var i = 0; i < target.childNodes.length; i++){
      await this.readElement(target.childNodes[i], target);
    }
  }

  async readItem(target, parent=null){
    if(target.nodeType == 3){
      this.terminal.EnqueueTask(new QueueItem(
        target.data,
        target,
        parent
      ));
    }
    for(var i = 0; i < target.childNodes.length; i++){
      await this.readItem(target.childNodes[i], target);
    }
  }

  setTarget(target, propertyKey = 'data'){
    this.target = target;
    this.propertyKey = propertyKey;
  }
  

  async writeLine(message){
    await this.write(message + '\n');
  }

  async write(message){
    await this.showText(message);
  }

  clearScreen(){
    if(this.propertyKey){
      this.target[this.propertyKey] = '';
    }else{
      this.target = '';
    }
  }

  async showText(message){
    for(let i = 0; i < message.length; i++){
      await this.writeChar(message[i]);
    }
  }
  
  async writeChar(i){
    if(i == '|'){
      return this.sleep(1000);
    }
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        if(this.propertyKey){
          this.target[this.propertyKey] += i;
        }else{
          this.target += i;
        }
        resolve();
      }, this.writeDelay)
    });
  }

  async sleep(ms){
    if(this.isFlushed){
      return;
    }
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve();
      }, ms);
    });
  }
}
