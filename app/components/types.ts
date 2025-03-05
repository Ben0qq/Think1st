export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  photo: File | null;
  day: Day;
  hour: string;
};

export type FormError = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  photo: string;
  day: string;
  hour: string;
};

export type Day = {
  day?: number;
  month?: number;
  year?: number;
  valid: boolean;
};
