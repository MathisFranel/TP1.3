"use client";
import React, { useState, useEffect } from "react";
import { Button, ProductCardLayout, SectionContainer, ProductCartLine } from "tp-kit/components";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {useStore, computeCartTotal, clearCart, addLine, removeLine, updateLine} from "../../hooks/use-cart";
import Cart  from "../../components/Cart";
import CartCounter from "../../components/CartCounter";

const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
    const cartItems = useStore((state) => state.lines);

    const [total, setTotal] = useState(computeCartTotal(cartItems));

    useEffect(() => {
        setTotal(computeCartTotal(cartItems));
    }, [cartItems]);

    return (
        <SectionContainer
            className="py-36"
            wrapperClassName="flex flex-col lg:flex-row gap-24"
        >


            {/* Produits */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                {products.map((product) => (
                    <ProductCardLayout
                        key={product.id}
                        product={product}
                        button={
                            <Button
                                variant={"ghost"}
                                fullWidth
                                onClick={() => addLine(product)}
                            >
                                Ajouter au panier
                            </Button>
                        }
                    />
                ))}
            </section>
            <CartCounter/>
            {/* /Produits */}

            {/* Panier */}


            <section className="w-full lg:w-1/3 space-y-8">
                <h2 className="text-2xl font-bold">Panier</h2>
                <Cart/>
                {/* Afficher le total du panier */}
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total :</span>
                    <span className="text-lg">{total} €</span>
                </div>

                {/* Bouton pour vider le panier */}
                <Button variant={"outline"} fullWidth onClick={clearCart}>
                    Vider le panier
                </Button>

                {/* Bouton pour commander */}
                <Button variant={"primary"} fullWidth>Commander</Button>
            </section>

            {/* /Panier */}
        </SectionContainer>
    );
}
