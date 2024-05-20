
export interface Document {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
}

export interface Posts extends Document {
  title: string;
  content: string;
  created_by: string;
}

export interface Users extends Document {
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

export interface News extends Document {
  title: string;
  content: string;
  image: string;
  tags: string;
  campus: string;
  unit: string;
  created_at: any;
}

export interface Events extends Document {
  title: string;
  description: string;
  image_id: string;
  unit: string;
  campus: string;
  price: any;
  member_discount: boolean;
  discount_price: any;
  event_date: any;
}

export interface Devices extends Document {
  user_id: string;
  token: string;
  users: any;
}

export interface Expenses extends Document {
  users: any;
  campus: string;
  department: string;
  description: string;
  expenseAttachments: any;
  sub_total: any;
  total: any;
  status: string;
}

export interface Expense_attachments extends Document {
  description: string;
  date: any;
  amount: any;
  attachment_id: string;
}

export interface Departments extends Document {
  Name: string;
  Campus: string;
  socials: string;
  description: string;
}

export interface Members extends Document {
  
}

export interface Auth_Tokens extends Document {
  token: string;
}

export interface Member_Categories extends Document {
  category_key: string;
  category_name: string;
}

export interface Customers extends Document {
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
