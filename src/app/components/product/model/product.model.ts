export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  defaultImage: string;
  images: string[];
  quantity: number;
  constructor(product?: Product) {
    this.id = product?.id || 0;
    this.name = product?.name || '';
    this.description = product?.description || '';
    this.price = product?.price || 0;
    this.discount = product?.discount || 0;
    this.defaultImage = product?.defaultImage || '';
    this.images = product?.images || [];
    this.quantity = product?.quantity || 0;

  }
}
