import { Component, OnInit, effect } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChatService } from '../../services/chat.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  standalone: true,
  imports: [
    ButtonModule, 
    InputTextareaModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  form: FormGroup;
  messages: any[] = [];

  constructor(
    // private readonly _cd: ChangeDetectorRef,
    private readonly _chatService: ChatService,
    private readonly _formBuilder: FormBuilder,
  ) {
    effect(() => {
      this.messages = this._chatService.messages();
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
      user: 'Khun',
      content: this.form.value.content
    })
  }

}
