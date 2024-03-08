import { Component, OnInit, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChatService } from '../../services/chat.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModel } from '../../models/message.model';
import { MessageComponent } from '../../components/message/message.component';


@Component({
  standalone: true,
  imports: [
    ButtonModule, 
    InputTextareaModule, 
    FormsModule, 
    ReactiveFormsModule,
    MessageComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  form: FormGroup;
  messages: (MessageModel & { owner: boolean }) [] = [];
  connectedUser: string = 'Khun';

  constructor(
    // private readonly _cd: ChangeDetectorRef,
    private readonly _chatService: ChatService,
    private readonly _formBuilder: FormBuilder,
  ) {
    effect(() => {
      this.messages = this._chatService.messages().map(m => ({
        ...m,
        owner: m.user === this.connectedUser
      }));
    });
    this.form = this._formBuilder.group({
      content: [null, [Validators.required, Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
  }

  send() {
    if(this.form.invalid) {
      return;
    }
    this._chatService.send({
      user: this.connectedUser,
      content: this.form.value.content
    })
  }

}
