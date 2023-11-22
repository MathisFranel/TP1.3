import { NextResponse, type NextRequest } from 'next/server'
import prisma from '../../utils/prisma';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams?.get('search') as string;
    const categories = searchParams?.getAll('cat') as string[];

    const params = {
        include: {
            products: {
                where: {
                    slug: {
                        contains: "",
                        mode: "insensitive"
                    }
                },
            },
        },
        where: {},
    };

    if (search) {
        params.include.products.where = {
            slug: {
                contains: search,
                mode: params.include.products.where.slug.mode,
            },
        };
    }

    if (categories && categories.length > 0) {
        params.where = {
            slug: {
                in: categories,
            },
        };
    }

    // @ts-ignore
    const result = await prisma.productCategory.findMany(params);

    const responseObject = {
        params: {
            categoriesSlugs: categories || [],
            search: search || "",
        },
        categories: result || [],
    };

    return NextResponse.json(responseObject);
}