export interface Login {
  email: string;
  password: string;
}

export interface LoginResponse {
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NmM0NTZmNTM4MjkyMGVkNDYyOTE5ZjYiLCJpYXQiOjE3MjQyNzA1OTMsImV4cCI6MTcyNDM1Njk5M30.J9-tlVOFtcXtZS6dBY_IrveUhJIHHIaGkKRXnnRKVRE",
  "role": "ADMIN_ROLE"
}
