import { useEffect } from "react";
import { BehaviorSubject, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { µStoreFilterProducts } from "../../redux/actions/store.actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Category } from "../../redux/reducers/store.reducer";
import { selectCategories } from "../../redux/selectors/store.selectors";
import { CategoriesSelector } from "./CategoriesSelector";
import { SearchBar } from "./SearchBar";

const search$ = new BehaviorSubject<string>('');
const selectedCategories$ = new BehaviorSubject<Category[]>([]);

export function StoreProductsFilter() {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);

    useEffect(() => {
        const filterSubscription = combineLatest({
            search: search$,
            categories: selectedCategories$,
        }).pipe(
            tap(filter => dispatch(µStoreFilterProducts(filter)))
        ).subscribe();

        return () => {
            filterSubscription.unsubscribe();
        }
    })

    function handleSearch(search: string) {
        search$.next(search);
    }

    function handleOnSelectionChange(categories: Category[]) {
        selectedCategories$.next(categories);
    }

    return <div className="flex">
        <SearchBar onSearch={handleSearch} />
        <CategoriesSelector categories={categories} onSelectionChange={handleOnSelectionChange} />
    </div>
}