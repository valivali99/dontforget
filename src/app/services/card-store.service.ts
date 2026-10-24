import { Injectable, effect, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { DEFAULT_COLOR } from '../data/card-colors';
import { DEFAULT_ICON } from '../data/home-icons';
import { ReminderCard, ReminderCardChanges } from '../models/reminder-card';

const STORAGE_KEY = 'dontforget.cards.v1';

/**
 * Holds the reminder cards and mirrors every change into the app's own storage
 * via Capacitor Preferences: SharedPreferences on Android (kept until the app's
 * data is cleared or the app is uninstalled), localStorage when run in a browser.
 */
@Injectable({ providedIn: 'root' })
export class CardStoreService {
  private readonly _cards = signal<ReminderCard[]>([]);
  readonly cards = this._cards.asReadonly();

  /** False until saved cards have been read, so the UI doesn't flash the empty state. */
  private readonly _ready = signal(false);
  readonly ready = this._ready.asReadonly();

  constructor() {
    this.load().then((cards) => {
      this._cards.set(cards);
      this._ready.set(true);
    });

    effect(() => {
      const cards = this._cards();
      // Never write before loading finished, or the empty initial list would wipe saved data.
      if (this._ready()) this.save(cards);
    });
  }

  /** A blank, unsaved card for the editor to fill in. */
  draft(): ReminderCard {
    return {
      id: crypto.randomUUID(),
      title: '',
      color: DEFAULT_COLOR,
      icon: DEFAULT_ICON,
      on: false,
      createdAt: Date.now(),
    };
  }

  add(card: ReminderCard): void {
    this._cards.update((cards) => [...cards, { ...card, on: false }]);
  }

  update(id: string, changes: ReminderCardChanges): void {
    this._cards.update((cards) => cards.map((c) => (c.id === id ? { ...c, ...changes } : c)));
  }

  toggle(id: string): void {
    this._cards.update((cards) => cards.map((c) => (c.id === id ? { ...c, on: !c.on } : c)));
  }

  remove(id: string): void {
    this._cards.update((cards) => cards.filter((c) => c.id !== id));
  }

  /** Sets every card back to unchecked, keeping the cards themselves. */
  uncheckAll(): void {
    this._cards.update((cards) => cards.map((c) => ({ ...c, on: false })));
  }

  /** Deletes all cards and wipes the saved data. */
  clearAll(): void {
    this._cards.set([]);
  }

  private async load(): Promise<ReminderCard[]> {
    try {
      const { value } = await Preferences.get({ key: STORAGE_KEY });
      // Fall back to cards saved by the earlier browser-only version.
      const raw = value ?? this.readLegacy();
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private async save(cards: ReminderCard[]): Promise<void> {
    try {
      await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(cards) });
    } catch {
      // Storage unavailable — keep working in memory.
    }
  }

  private readLegacy(): string | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw !== null) localStorage.removeItem(STORAGE_KEY);
      return raw;
    } catch {
      return null;
    }
  }
}
