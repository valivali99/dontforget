export interface HomeIcon {
  /** Material Symbols ligature name. */
  name: string;
  label: string;
}

/** Icons for things around the house that people tend to forget. */
export const HOME_ICONS: HomeIcon[] = [
  { name: 'lightbulb', label: 'Lights' },
  { name: 'faucet', label: 'Sink / tap' },
  { name: 'key', label: 'Keys' },
  { name: 'door_front', label: 'Front door' },
  { name: 'lock', label: 'Lock' },
  { name: 'window', label: 'Windows' },
  { name: 'garage', label: 'Garage' },
  { name: 'oven_gen', label: 'Oven' },
  { name: 'cooking', label: 'Stove / pots' },
  { name: 'microwave', label: 'Microwave' },
  { name: 'coffee_maker', label: 'Coffee maker' },
  { name: 'kitchen', label: 'Fridge' },
  { name: 'dishwasher_gen', label: 'Dishwasher' },
  { name: 'local_laundry_service', label: 'Washing machine' },
  { name: 'iron', label: 'Iron' },
  { name: 'shower', label: 'Shower' },
  { name: 'bathtub', label: 'Bathtub' },
  { name: 'heat', label: 'Heating' },
  { name: 'ac_unit', label: 'Air conditioning' },
  { name: 'thermostat', label: 'Thermostat' },
  { name: 'tv', label: 'TV' },
  { name: 'power', label: 'Plug / power' },
  { name: 'wifi', label: 'Wi-Fi / router' },
  { name: 'delete', label: 'Trash' },
  { name: 'recycling', label: 'Recycling' },
  { name: 'potted_plant', label: 'Plants' },
  { name: 'pets', label: 'Pets' },
  { name: 'wallet', label: 'Wallet' },
  { name: 'smartphone', label: 'Phone' },
  { name: 'medication', label: 'Medication' },
  { name: 'umbrella', label: 'Umbrella' },
  { name: 'backpack', label: 'Bag' },
  { name: 'mail', label: 'Mail' },
  { name: 'bed', label: 'Bedroom' },
  { name: 'home', label: 'Home' },
];

export const DEFAULT_ICON = 'home';
