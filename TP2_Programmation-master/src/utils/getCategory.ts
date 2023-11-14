import prisma from "./prisma";
import {cache} from "react";

export const getCategories = cache(async () => {
    return await prisma.productCategory.findMany({include: {products: true}})
})

export const getCategory = cache(async (slug: string) => {
    return await prisma.productCategory.findFirst({where: {slug}, include: {products: true}})
})

export const getProduct = cache(async (slugProd: string, slugCat: string) => {
    return await prisma.product.findFirst({
        include: {
            category: {
                include: {
                    products: {
                        where: {
                            slug: {
                                not: slugCat
                            }
                        }
                    }
                }
            }
        },
        where: {
            slug: slugProd
        },
    })
})