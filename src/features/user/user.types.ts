// {
//     "success": true,
//     "data": {
//         "id": "EQPLglo6IvaUQ5ZYhEoGY9OdRxf1",
//         "email": "test@gmail.com",
//         "phone": null,
//         "firstName": null,
//         "lastName": null,
//         "birthdate": null,
//         "isIdentityVerified": false,
//         "roles": [
//             "USER"
//         ],
//         "createdAt": "2026-02-17T09:06:23.018Z",
//         "updatedAt": "2026-02-17T09:06:23.018Z"
//     }
// }

import { PaginationData } from "@/types/types";


export type UserRole = "USER"

export interface User {
  id: string;
  email: string;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  birthdate: string | null;
  isIdentityVerified: boolean;
  roles: UserRole[];
  createdAt: string;
  updatedAt: string;
}

export interface GetMeResponse {
  success: boolean;
  data: User;
}

export interface Order{
  id: number;
  order_no: string;
  items: [];
  status: "" | "";
  product_amount: number;
  total_amount: number;
  created_at: string;
}

export interface OrdersPageApiResponse{
    data: Order[];
    pagination: PaginationData;
}