import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardEditorComponent, CardEditorData } from './components/card-editor/card-editor.component';
import { ReminderCardComponent } from './components/reminder-card/reminder-card.component';
import { ReminderCard, ReminderCardChanges } from './models/reminder-card';
import { CardStoreService } from './services/card-store.service';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, ReminderCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly store = inject(CardStoreService);
  private readonly dialog = inject(MatDialog);

  readonly cards = this.store.cards;
  readonly ready = this.store.ready;
  readonly checkedCount = computed(() => this.cards().filter((c) => c.on).length);
  readonly progress = computed(() =>
    this.cards().length ? Math.round((this.checkedCount() / this.cards().length) * 100) : 0,
  );
  readonly allChecked = computed(() => this.cards().length > 0 && this.checkedCount() === this.cards().length);

  readonly greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  addCard(): void {
    // The card is only stored once saved, so cancelling leaves nothing behind.
    this.openEditor(this.store.draft(), true);
  }

  editCard(card: ReminderCard): void {
    this.openEditor(card, false);
  }

  toggleCard(card: ReminderCard): void {
    this.store.toggle(card.id);
  }

  removeCard(card: ReminderCard): void {
    if (confirm(`Delete "${card.title}"?`)) {
      this.store.remove(card.id);
    }
  }

  uncheckAll(): void {
    this.store.uncheckAll();
  }

  resetEverything(): void {
    if (confirm('Delete all cards and start fresh? This cannot be undone.')) {
      this.store.clearAll();
    }
  }

  private openEditor(card: ReminderCard, isNew: boolean): void {
    this.dialog
      .open<CardEditorComponent, CardEditorData, ReminderCardChanges>(CardEditorComponent, {
        data: { card, isNew },
        width: '480px',
        maxWidth: '94vw',
        panelClass: 'friendly-dialog',
      })
      .afterClosed()
      .subscribe((changes) => {
        if (!changes) return;
        if (isNew) this.store.add({ ...card, ...changes });
        else this.store.update(card.id, changes);
      });
  }
}
