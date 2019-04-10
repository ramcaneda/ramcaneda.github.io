import { Injectable, Renderer } from "@angular/core";
const writeDelay = 20;

@Injectable()
export class TerminalService {
  private queue: QueueItem[];
  private isRunning: boolean;
  private isFlushed = false;
  private isSkipping = true;

  constructor(){
    this.queue = [];
  }

  public EnqueueTask(item: QueueItem){
    this.queue.push(item);
    this.isFlushed = false;
  }

  private waiter: Promise<void>;
  public async run(){
    if(!this.isRunning){
      this.waiter = new Promise(async (resolve, reject)=>{
        this.isRunning = true;
        while(this.queue.length > 0){
          if(this.isFlushed){
            break;
          }
          let currentItem = this.queue.shift();
          currentItem.renderer.setElementClass(currentItem.parent, 'cursor', true);
          await currentItem.write();
          if(this.queue.length > 0){
            currentItem.renderer.setElementClass(currentItem.parent, 'cursor', false);
          }
        }
        this.isRunning = false;
        resolve();
      });
    }
    return this.waiter;
  }
  public skip() {
    console.log('is Skipping');
    this.isFlushed = true;
    this.queue = [];
  }
}

export class QueueItem{
  constructor(
    public text: string,
    public target: any,
    public parent: any,
    public renderer: Renderer
  ){
    this.target.data = '';
  }

  async write(flush = false){
    for(var i = 0; i < this.text.length; i++){
      console.log('writing:', this.text[i]);
      if(this.text[i] == '|'){
        if(!flush)
        await sleep(1000);
        continue;
      }
      this.target.data += this.text[i];
      if(!flush)
      await sleep(writeDelay);
    }
  }
}

async function sleep(ms){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve();
    }, ms);
  });
}