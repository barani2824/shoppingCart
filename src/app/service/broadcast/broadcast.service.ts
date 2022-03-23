import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
    providedIn:'root'
})
export class BroadcastService {

  private observableMapping: any;

  constructor() {
    this.observableMapping = {};
  }

  publishMsg(eventName: string, data?: any) {
    this.validateEventName(eventName);
    this.publishNext(eventName, Subject, data);
  }

  receiveMsg(eventName: string, next?: (value: any) => void, error?: (error: any) => any, complete?: () => void): Subscription {
    this.validateEventName(eventName);
    return this.observableMapping[eventName].ref.subscribe(next, error, complete);
  }

  clearMsgByEvent(eventName: string) {
    this.observableMapping[eventName].ref.complete();
    delete this.observableMapping[eventName];
  }

  private publishNext(eventName: string, type: any, data?: any) {
    this.checkEventType(eventName, type);
    this.observableMapping[eventName].ref.next(data);
  }

  private checkEventType(eventName: string, type: any) {
    const object = this.observableMapping[eventName];
    let errorMessage;
    if(!object)
        return;
    if(!object) {
      errorMessage = `Event doesn't exist of type: ${type} or it has been completed`;
    } else if(object.type !== type) {
      errorMessage = `Event exists with other type: ${object.type}. Expected type: ${type}`;
    }
    if(errorMessage) {
      throw Error(`Error (${eventName}): ${errorMessage}`);
    }
  }

  private validateEventName(eventName: string) {
    if(!eventName) {
      throw Error('Event name not provided');
    }
    const object = this.observableMapping[eventName];
    if(object) { return; }

    this.observableMapping[eventName] = {
      type: Subject,
      ref: new Subject()
    };
  }
}