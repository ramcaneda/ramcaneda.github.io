import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ramcaneda';
  terminal = '';
  cursor = '';
  cursorChar = '█'

  async ngOnInit(){
    let cursorBlink = setInterval(()=>{
      if(this.cursor.trim().length == 0){
        this.cursor = this.cursorChar;
      }else{
        this.cursor = ' ';
      }
    }, 200);

    await this.write('INITIALIZING...');
    await this.sleep(2000);
    this.clearScreen();
    await this.writeLine(`Hi! My name is Ram.`);
    await this.sleep(2000);
    await this.writeLine(`\nI'm a programmer, currently working for Katana Techworks Inc.`);
    await this.sleep(2000);
    await this.writeLine(`\nThis page is still under construction but you can reach me at ramcaneda@live.com`);
  }

  async writeLine(message){
    await this.write(message + '\n');
  }

  async write(message){
    await this.showText(message);
  }

  clearScreen(){
    this.terminal = '';
  }

  async showText(message, index = 0){
    if(index < message.length){
      await this.writeChar(message[index++]);
      await this.showText(message, index);
    }
  }
  
  async writeChar(i){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        this.terminal += i;
        resolve();
      }, 50)
    });
  }

  async sleep(ms){
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve();
      }, ms);
    });
  }
}