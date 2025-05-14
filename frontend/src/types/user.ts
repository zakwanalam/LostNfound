export interface User {
  userId: string;
  email: string;
  oAuthProvider: string;
  oAuthId: string;
  passwordHashed: string | null;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  profilePictureUrl: string;
}
