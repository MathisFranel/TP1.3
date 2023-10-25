import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { ProductList } from "../../components/product-list";
import { NextPageProps } from "../../types";
import { Metadata } from "next";
import prisma from "../../utils/prisma";

const category = await prisma.productCategory.findMany({include:{products:true}});

type Props = {
  categorySlug: string;
};

export async function generateMetadata({ params, searchParams} : NextPageProps<Props>) : Promise<Metadata> {
  return {
    title: category[0].name,
    description: `Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits ${category[0].name}`
  }
}

export default function CategoryPage({params}: NextPageProps<Props>) {
  return <SectionContainer>
    <BreadCrumbs 
      items={[
        {
          label: "Accueil",
          url: "/"
        },
        {
          label: category[0].name,
          url: `/${category[0].slug}`
        }
      ]}
    />

    <ProductList categories={[category[0]]} />
  </SectionContainer>
}