export class Constants {

  // Local Storage
  public static LOGGED_IN_USER: string = 'LOGGED_IN_USER';

  // Roles
  public static ROLE_ADMIN: string = 'ADMIN';
  public static ROLE_CUSTOMER: string = 'CUSTOMER';

  // App Routes
  static ROUTE_HOME: string = '';
  static ROUTE_LOGIN: string = 'login';

  // Navigate path
  static NAVIGATE_PRODUCT: string = '/product';

  // User Routes
  static ROUTE_USER: string = 'user';
  static ROUTE_USER_CART: string = 'cart';

  // Product actions
  static PRODUCT_ACTION_DELETE: string = 'Product Deleted';
  static PRODUCT_ACTION_ERROR: string = 'Error, Try again!';
  static PRODUCT_ACTION_CREATE: string = 'Product Created';
  static PRODUCT_ACTION_UPDATE: string = 'Product Updated';
  
  // Cart actions
  static CART_ACTION_ADD: string = 'Added';
  static CART_ACTION_REMOVE: string = 'Removed';
  static CART_UPDATED: string = 'CartUpdated';
  static CART_UPDATED_COUNT: string = 'UpdateCardCount';

  // Product route params
  static PRODUCT_ROUTE_PARAM_PRODUCT_ID: string = '${product_id}';
  static PRODUCT_ROUTE_PARAM_KEYWORD: string = '${keyword}';
  static PRODUCT_QUERY_PARAM_PAGE_NUMBER: string = '${page_number}';
  static PRODUCT_QUERY_PARAM_NUMBER_OF_ENTRIES: string = '${number_of_entries}';

  static USER_ROUTE_PARAM_USER_ID: string = '${user_id}';

}
