import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

export default function EditProductPage(){
    const [productInfo, setProductInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
      if (!id) {
        return;
      }
      setIsLoading(true);
      axios.get('/api/products?id='+id).then(response => {
        setProductInfo(response.data);
        setIsLoading(false);
      });
    }, [id]);

    return(
        <Layout>
          <h1 className="mb-8">Editar producto</h1>
          {isLoading && (
            <Spinner />
          )}
          {productInfo && (
            <ProductForm {...productInfo} />
          )}
        </Layout>
    )
}