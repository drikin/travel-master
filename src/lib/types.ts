// 旅程データ
export interface Flight {
  leg: string;
  flight: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  aircraft: string;
  seats: string;
  cls: string;
  layover: string;
}

export interface Hotel {
  name: string;
  nights: string;
  dates: string;
  address: string;
  phone: string;
  room: string;
  checkin: string;
  checkout: string;
  payment: string;
  notes: string;
  bookingRef: string;
}

export interface Day {
  day: number;
  date: string;
  icon: string;
  move: string;
  content: string;
  stay: string;
}

export interface RentalCar {
  company: string;
  ref: string;
  car: string;
  pickup: string;
  returnLoc: string;
  extraDriver: string;
  dw: string;
  mileage: string;
  total: string;
  phone: string;
  hours: string;
}

export interface Dinner {
  date: string;
  venue: string;
  time: string;
  notes: string;
}

export interface Insurance {
  provider: string;
  plan: string;
  certNumber: string;
  period: string;
  travelers: string;
  medicalMax: string;
  deductible: string;
  evacuation: string;
  emergencyPhone: string;
  notes: string;
}

export interface TripData {
  title: string;
  subtitle: string;
  password: string;
  flights: Flight[];
  bookingRef: string;
  milesCost: string;
  remainingMiles: string;
  passengers: string;
  days: Day[];
  hotels: Hotel[];
  rentalCar: RentalCar;
  dinners: Dinner[];
  insurance: Insurance;
  ihgTotal: string;
  ihgRemaining: string;
  todo: { label: string; done: boolean }[];
  notes: string[];
}
