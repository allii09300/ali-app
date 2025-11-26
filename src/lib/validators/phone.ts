export const iranPhoneRegex = /^(09\d{9}|(\+98|0098)9\d{9})$/;


export function validateIranPhone(phone: string): boolean {
  return iranPhoneRegex.test(phone);
}
