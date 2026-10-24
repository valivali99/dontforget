export interface ReminderCard {
  id: string;
  title: string;
  /** Hex color, e.g. "#4f7cff". */
  color: string;
  /** Material Symbols icon name, e.g. "lightbulb". */
  icon: string;
  /** Toggle state. New cards always start OFF. */
  on: boolean;
  createdAt: number;
}

export type ReminderCardChanges = Partial<Pick<ReminderCard, 'title' | 'color' | 'icon' | 'on'>>;
