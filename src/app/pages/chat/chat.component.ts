import { Component, OnInit, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChatService } from '../../services/chat.service';


@Component({
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  messages: any[] = [];

  constructor(
    // private readonly _cd: ChangeDetectorRef,
    private readonly _chatService: ChatService
  ) {
    effect(() => {
      this.messages = this._chatService.messages();
    })
  }

  ngOnInit(): void {
  }

  send() {
    this._chatService.send({
      user: 'Khun',
      content: 'Coucou'
    })
  }

}
