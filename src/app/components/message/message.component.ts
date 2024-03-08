import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MessageModel } from '../../models/message.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input()
  message!: MessageModel & { owner: boolean }
}
