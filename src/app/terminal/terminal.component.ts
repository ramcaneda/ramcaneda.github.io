import { Component, OnInit, Input, ContentChild, ElementRef, Renderer, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements AfterViewInit {
  @Input() 
  content: String;

  @ContentChild(TerminalComponent)
  element: any;

  @ViewChild('terminalOut')
  elementOut: any
  

  target: any;
  propertyKey: any;
  isFlushed = false;

  constructor(private elt:ElementRef, private renderer:Renderer) {
  }

  onClick(){
    this.isFlushed = true;
  }
  
  async ngAfterViewInit() {
    var textNode = this.elt.nativeElement.childNodes[0];
    var textToWrite = [];
    for(var i = 0; i < textNode.childNodes.length; i++){
      let target = textNode.childNodes[i];
      if(target.textContent.trim().length == 0){
        continue;
      }
      textToWrite.push({
        text: target.textContent,
        target,
        propKey: 'textContent'
      })
      let text = target.textContent;
      this.setTarget(target, 'textContent');
      await this.clearScreen();
    }
    console.log(textToWrite);
    for(var i = 0; i< textToWrite.length; i++){
      let t = textToWrite[i];
      this.setTarget(t.target, t.propKey);
      await this.write(t.text);
    }
    
    var textInput = textNode.innerText.trim();
    var inputs = textInput.split('\n');
    // inputs.shift();

    console.log(inputs);
    // await this.clearScreen()
    // await this.write(textInput);
  }

  setTarget(target, propertyKey){
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
      }, 5)
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
