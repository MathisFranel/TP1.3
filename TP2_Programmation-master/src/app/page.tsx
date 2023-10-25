import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { ProductList } from "../components/product-list";
import { Metadata } from "next";
import prisma from "../utils/prisma";
import {getCategory} from "../utils/getCategory";
import {NextPageProps} from "../types";




type Props = {

  categorySlug: string;

};



export async function generateMetadata({params, searchParams}: NextPageProps<Props>): Promise<Metadata> {
  const category = await getCategory(params.categorySlug);
  return {
    title: category?.name,
    description: `Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits ${category?.name}`
  }

}

export default async function CategoryPage({params}: NextPageProps<Props>) {
  const category = await getCategory(params.categorySlug);
  if (!category) {
    return null;
  }
  return <SectionContainer>
    <BreadCrumbs
        items={[
          {
            label: "Accueil",
            url: "/"
          },
          {
            label: category.name,
            url: `/${category.slug}`
          }
        ]}
    />

    <ProductList categories={[category]}/>
  </SectionContainer>
}