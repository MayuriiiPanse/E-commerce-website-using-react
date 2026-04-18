// import { lazy } from "react";

// import { Suspense} from "react";
// import InfiniteScroll from "react-infinite-scroll-component"
// import useinfiniteProducts from "../../utils/useinfiniteProducts";
// const Producttemplate = lazy(()=> import("../../components/Producttemplate"))


// const Products = () => {
//  const{products,hasMore,fetchproducts} =useinfiniteProducts()
 


//   return (

//     <InfiniteScroll
//       dataLength={products.length}
//       next={fetchproducts}
//       hasMore={hasMore}
//       scrollThreshold={0.9}
//       loader={<h4 className="text-center">Loading...</h4>}

//       endMessage={
//         <p style={{ textAlign: 'center' }}>
//           <b>Yay! You have seen it all</b>
//         </p>
//       }
//     >
//       <div className="grid grid-cols-3 gap-7 p-5">

//         {products?.map((product) => (
//        <Suspense 
      
//        fallback={ <h1 className="text-center text-4xl text-yellow-500">
//         LOADING.......</h1>
//         }>
    
//         <Producttemplate key={product.id} product={product}/>
        
//   </Suspense>))}
//       </div>
//     </InfiniteScroll>


//   )

// }

// export default Products

import { lazy, Suspense } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import useinfiniteProducts from "../../utils/useinfiniteProducts"

const Producttemplate = lazy(() => import("../../components/Producttemplate"))

const ProductSkeleton = () => (
  <div className="card" style={{ minHeight: 360 }}>
    <div style={{ background: "var(--surface-2, #f0f0ee)", aspectRatio: "4/3" }} />
    <div style={{ padding: "16px 18px" }}>
      <div style={{ height: 12, background: "var(--border)", borderRadius: 2, width: "40%", marginBottom: 12 }} />
      <div style={{ height: 14, background: "var(--border)", borderRadius: 2, marginBottom: 8 }} />
      <div style={{ height: 14, background: "var(--border)", borderRadius: 2, width: "70%", marginBottom: 20 }} />
      <div style={{ height: 10, background: "var(--border)", borderRadius: 2, width: "55%", marginBottom: 10 }} />
      <div style={{ height: 10, background: "var(--border)", borderRadius: 2, width: "45%" }} />
    </div>
  </div>
)

const Products = () => {
  const { products, hasMore, fetchproducts } = useinfiniteProducts()

  return (
    <div style={{ padding: "48px 0" }}>
      {/* Page header */}
      <div className="fade-up" style={{ marginBottom: 40 }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
          Collection
        </p>
        <h1 className="serif" style={{ fontSize: "2.2rem", fontWeight: 400, margin: 0, letterSpacing: "-0.02em" }}>
          All Products
        </h1>
      </div>

      <InfiniteScroll
        dataLength={products.length}
        next={fetchproducts}
        hasMore={hasMore}
        scrollThreshold={0.9}
        loader={
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 24 }}>
            {[1, 2, 3].map(i => <ProductSkeleton key={i} />)}
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", padding: "40px 0 16px", letterSpacing: "0.06em" }}>
            — End of collection —
          </p>
        }
        style={{ overflow: "visible" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {products?.map((product) => (
            <Suspense key={product.id} fallback={<ProductSkeleton />}>
              <Producttemplate product={product} />
            </Suspense>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Products
