import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { readableTextColor } from '../../data/card-colors';
import { ReminderCard } from '../../models/reminder-card';

@Component({
  selector: 'app-reminder-card',
  imports: [MatButtonModule, MatIconModule, MatSlideToggleModule, MatTooltipModule],
  templateUrl: './reminder-card.component.html',
  styleUrl: './reminder-card.component.scss',
})
export class ReminderCardComponent {
  readonly card = input.required<ReminderCard>();

  readonly toggled = output<void>();
  readonly edit = output<void>();
  readonly remove = output<void>();

  readonly textColor = computed(() => readableTextColor(this.card().color));
}
