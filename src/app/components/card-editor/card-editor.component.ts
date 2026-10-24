import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CARD_COLORS, readableTextColor } from '../../data/card-colors';
import { HOME_ICONS } from '../../data/home-icons';
import { ReminderCard, ReminderCardChanges } from '../../models/reminder-card';

export interface CardEditorData {
  card: ReminderCard;
  isNew: boolean;
}

@Component({
  selector: 'app-card-editor',
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './card-editor.component.html',
  styleUrl: './card-editor.component.scss',
})
export class CardEditorComponent {
  private readonly dialogRef = inject<MatDialogRef<CardEditorComponent, ReminderCardChanges>>(MatDialogRef);
  readonly data = inject<CardEditorData>(MAT_DIALOG_DATA);

  readonly colors = CARD_COLORS;
  readonly icons = HOME_ICONS;

  readonly title = signal(this.data.card.title);
  readonly color = signal(this.data.card.color);
  readonly icon = signal(this.data.card.icon);
  readonly textColor = computed(() => readableTextColor(this.color()));
  readonly canSave = computed(() => this.title().trim().length > 0);

  save(): void {
    if (!this.canSave()) return;
    this.dialogRef.close({ title: this.title().trim(), color: this.color(), icon: this.icon() });
  }
}
