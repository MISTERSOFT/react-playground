import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Cart, Category, Product } from '../redux/reducers/store.reducer';

// https://fakestoreapi.com/docs

export class StoreService {
    static getProducts() {
        return ajax.getJSON<Product[]>('https://fakestoreapi.com/products');
    }

    static getCategories() {
        return ajax.getJSON<Category[]>('https://fakestoreapi.com/products/categories');
    }

    static getCart(userId: number) {
        return ajax.getJSON<Cart[]>(`https://fakestoreapi.com/carts/user/${userId}?sort=desc`).pipe(map(carts => carts.length ? carts[0] : undefined));
    }
}