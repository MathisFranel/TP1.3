"use client";
import { FC, memo, useMemo, useState } from "react";
import { ProductFilters } from "./product-filters";
import { Button, ProductCardLayout, ProductGridLayout } from "tp-kit/components";
import { ProductFiltersResult } from "../types";
import { filterProducts } from "../utils/filter-products";
import Link from "next/link";
import {addLine} from "../hooks/use-cart";
import {ProductsCategoryData,ProductData} from "tp-kit/types";

type Props = {
  categories: ProductsCategoryData[];
  showFilters?: boolean
};

const ProductList: FC<Props> = memo(function ({ categories, showFilters = false }) {
  const cate = categories[0]
    const [filters, setFilters] = useState<ProductFiltersResult | undefined>();
  const filteredCategories = useMemo(() => filterProducts(cate, filters), [filters, cate]);
    if(!cate){
        return null;
    }

    


  return (
    <div className="flex flex-row gap-8">
      {/* Filters */}
      {showFilters && <div className="w-full max-w-[270px]">
        <ProductFilters categories={cate} onChange={setFilters} />
      </div>}

      {/* Grille Produit */}
      <div className="flex-1 space-y-24">
        {filteredCategories.map((cat) => (
          <section key={cat.id}>
            <h2 className="text-lg font-semibold mb-8 tracking-tight">
              <Link href={`/${cat.slug}`} className="link">{cat.name} ({cat.products.length})</Link>
            </h2>

            <ProductGridLayout products={cat.products}>
              {(product) => (
                <ProductCardLayout
                  product={product}
                  button={
                    <Button variant="ghost" className="flex-1 !py-4"  onClick={() => addLine(product)}>
                      Ajouter au panier
                    </Button>
                  }
                />
              )}
            </ProductGridLayout>
          </section>
        ))}
      </div>
    </div>
  );
});

ProductList.displayName = "ProductList";
export { ProductList };
