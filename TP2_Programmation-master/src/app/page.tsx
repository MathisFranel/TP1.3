import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { ProductList } from "../components/product-list";
import { Metadata } from "next";
import prisma from "../utils/prisma";
import {getCategories} from "../utils/getCategory";
import {NextPageProps} from "../types";




type Props = {

  categorySlug: string;

};


export default async function CategoryPage({params}: NextPageProps<Props>) {
  const categories = await getCategories()

  if (!categories) {
    return null;
  }
  return <SectionContainer>
    <BreadCrumbs
        items={[
          {
            label: "Accueil",
            url: "/"
          }
        ]}
    />

    <ProductList categories={[categories]}/>
  </SectionContainer>
}