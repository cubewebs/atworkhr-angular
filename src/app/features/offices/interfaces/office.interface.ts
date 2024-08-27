export interface OfficeResponse {
  ok: boolean,
  offices: Office[]
}

export interface Office {
  "name": string,
  "code": string,
  "createdBy": {
    "uid": string,
    "name": string,
    "email": string
  },
  "uid": string
}
