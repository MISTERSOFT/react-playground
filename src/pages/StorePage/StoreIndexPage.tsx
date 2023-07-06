import { Header } from "../../components/header/Header";
import { useAppSelector } from "../../redux/hooks";
import { selectProductsFiltered } from "../../redux/selectors/store.selectors";
import { StoreProductsFilter } from "../../components/store-products-filter/StoreProductsFilter";
import { Link } from "react-router-dom";

export function StoreIndexPage() {
    const products = useAppSelector(selectProductsFiltered);

    return (
        <>
            <Header>Store</Header>

            <StoreProductsFilter />

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <div key={product.id} className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-400">
                                    <Link to={`${product.id}`}>
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.title}
                                    </Link>
                                </h3>
                            </div>
                            <p className="text-sm font-medium text-white">{product.price}€</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}