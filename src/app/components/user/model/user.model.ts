export class Name {
  firstName: string;
  lastName: string;

  constructor(name?: Name) {
    this.firstName = name?.firstName || '';
    this.lastName = name?.lastName || '';
  }
}

export class User {
  id: number;
  name: Name;
  role: string;
  email: string;

  constructor(user?: User) {
    this.id = user?.id || 0;
    this.name = user?.name || new Name();
    this.role = user?.role || 'CUSTOMER';
    this.email = user?.email || '';
  }
}
