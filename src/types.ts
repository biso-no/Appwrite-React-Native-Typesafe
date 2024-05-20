
import { Models } from 'node-appwrite';

export interface Document extends Models.Document {}

export interface Posts extends Models.Document {
  title: string;
  content: string;
  created_by: string;
}

export interface Users extends Models.Document {
  name: string;
  email: string;
  position: string;
  department: string;
  campus: string;
  avatar: string;
  user_id: string;
  address: string;
  city: string;
  zip: number;
  bank_account: string;
}

export interface News extends Models.Document {
  title: string;
  content: string;
  image: string;
  tags: string;
  campus: string;
  unit: string;
  created_at: Date;
}

export interface Events extends Models.Document {
  title: string;
  description: string;
  image_id: string;
  unit: string;
  campus: string;
  price: any;
  member_discount: boolean;
  discount_price: any;
  event_date: Date;
}

export interface Devices extends Models.Document {
  user_id: string;
  token: string;
  users: any;
}

export interface Expenses extends Models.Document {
  users: any;
  campus: string;
  department: string;
  description: string;
  expenseAttachments: any;
  sub_total: any;
  total: any;
  status: string;
}

export interface Expense_attachments extends Models.Document {
  description: string;
  date: Date;
  amount: any;
  attachment_id: string;
}

export interface Departments extends Models.Document {
  Name: string;
  Campus: string;
  socials: string;
  description: string;
}

export interface Members extends Models.Document {
  
}

export interface Auth_Tokens extends Models.Document {
  token: string;
}

export interface Member_Categories extends Models.Document {
  category_key: string;
  category_name: string;
}

export interface Customers extends Models.Document {
  Id: string;
  Name: string;
}

export type DatabaseMap = {
  'app': {
    'posts': Posts;
    'users': Users;
    'news': News;
    'events': Events;
    'devices': Devices;
    'expenses': Expenses;
    'expense_attachments': Expense_attachments;
  },
  'global': {
    'departments': Departments;
  },
  '24so': {
    'members': Members;
    'auth_tokens': Auth_Tokens;
    'member_categories': Member_Categories;
    'customers': Customers;
  },
};
