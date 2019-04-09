import { Injectable } from "@angular/core";
const writeDelay = 200;

@Injectable()
export class TerminalService {
  private queue: QueueItem[];
  private isRunning: boolean;
  private isFlushed = false;

  constructor(){
    this.queue = [];
  }

  public EnqueueTask(item: QueueItem){
    console.log(`${Date.now()}-queuing ${item.text}`)
    this.queue.push(item);
  }

  public async run(){
    this.isRunning = true;
    while(this.queue.length > 0){
      let currentItem = this.queue.shift();
      console.log(`${Date.now()}-running ${currentItem.text}`)
      await currentItem.write();
    }
    this.isRunning = false;
  }
}

export class QueueItem{
  constructor(
    public text: string,
    private target: any,
    private parent: any
  ){
    this.target.data = '';
  }

  async write(){
    for(var i = 0; i < this.text.length; i++){
      if(this.text[i] == '|'){
        await sleep(1000);
        continue;
      }
      this.target.data += this.text[i];
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