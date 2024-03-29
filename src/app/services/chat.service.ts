import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { MessageModel } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _connection!: HubConnection;
  
  public messages: WritableSignal<MessageModel[]> = signal([]);

  constructor(
    private readonly _messsageService: MessageService
  ) { 
    this._connection = new HubConnectionBuilder()
      .withUrl('https://demoappsocket.azurewebsites.net/ws/chat')
      .withAutomaticReconnect()
      .build()
    
      this._connection.start().then(() => {
        this._connection.on('allMessages', data => {
          this.messages.set(data);
        });
        this._connection.on('newMessage', data => {
          this.messages.update(m => [...m, data]);
          this._messsageService.add({
            severity: 'info',
            summary: `Vous avez recu un message de ${data.user}`
          })
        })
      }).catch(error => {
        console.log(error)
      })
  }

  send(message: any) {
    this._connection.invoke('createMessage', message);
  }
}
