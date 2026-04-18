import { useDispatch, useSelector } from "react-redux";
import { loadlazyproduct } from "../store/reducers/productSlice";
import { getProducts } from "./localStorageDB";
import { useEffect, useState, useRef } from "react";

const PAGE_SIZE = 6;

const useinfiniteProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const [hasMore, setHasMore] = useState(true);

  // Use a ref for the page so fetchproducts always reads the latest value
  const pageRef = useRef(0);

  const fetchproducts = () => {
    const allProducts = getProducts();
    const start = pageRef.current * PAGE_SIZE;
    const newItems = allProducts.slice(start, start + PAGE_SIZE);

    if (newItems.length === 0) {
      setHasMore(false);
      return;
    }

    dispatch(loadlazyproduct(newItems));
    pageRef.current += 1;

    if (start + PAGE_SIZE >= allProducts.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  return { products, hasMore, fetchproducts };
};

export default useinfiniteProducts;
