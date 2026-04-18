// import { useDispatch, useSelector } from "react-redux";
// import {asyncupdateuser} from "../../store/actions/userActions"

// const Cart = () => {
//   const dispatch = useDispatch()
//   const products = useSelector((state) => state.productReducer.products);
//   const users = useSelector((state) => state.usersReducer?.user);

//   const increaseQuantityHandler = (index, product) => {
//     const copyuser = {
//       ...users,
//       cart: users.cart ? [...users.cart] : [] }


//        copyuser.cart[index] = {
//         ...copyuser.cart[index],
//         quantity: copyuser.cart[index].quantity + 1
//       }
      
//     console.log(copyuser);
       
//    dispatch(asyncupdateuser(copyuser.id, copyuser))

//   }



//   const decreaseQuantityHandler = (index, product) => { 
//      const copyuser = {
//       ...users,
//       cart: users.cart ? [...users.cart] : [] }

//      if (copyuser.cart[index].quantity === 1) {
//     // remove item immediately
//     copyuser.cart.splice(index, 1);
//   } else {
//     // decrease quantity
//     copyuser.cart[index] = {
//       ...copyuser.cart[index],
//       quantity: copyuser.cart[index].quantity - 1
//     };
//   }

//   console.log(copyuser);
//    dispatch(asyncupdateuser(copyuser.id, copyuser))
       
//       }
      
   
      
  

//   const cartItems = users?.cart?.map((e, index) => {
  
//     return (
//       <li
//         className="mb-7 flex items-center justify-between bg-gray-700 p-2 rounded "
//         key={e.productId}>
//         <img
//           className="mr-10 w-[10vmax] h-[10vmax] object-cover"
//           src={e?.product?.image}
//           alt="" />

//         <span>{e?.product?.title}</span>
//         <span>{e?.product?.price}</span>
//         <p>
//           <button onClick={() => decreaseQuantityHandler(index, e)} className="text-xl">-</button>
//           <span className="mx-3 p-1 rounded bg-gray-700">
//             {" "}
//             {e?.quantity}{" "}
//           </span>
//           <button onClick={() => increaseQuantityHandler(index, e)} className="text-xl">+</button>
//         </p>



//       </li>
//     )
//   })

//   return (
//     <div>{cartItems}</div>
//   )

// }

// export default Cart


import { useDispatch, useSelector } from "react-redux"
import { asyncupdateuser } from "../../store/actions/userActions"
import { Link } from "react-router-dom"

const Cart = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.usersReducer?.user)

  const increaseQuantityHandler = (index) => {
    const copyuser = { ...users, cart: users.cart ? [...users.cart] : [] }
    copyuser.cart[index] = { ...copyuser.cart[index], quantity: copyuser.cart[index].quantity + 1 }
    dispatch(asyncupdateuser(copyuser.id, copyuser))
  }

  const decreaseQuantityHandler = (index) => {
    const copyuser = { ...users, cart: users.cart ? [...users.cart] : [] }
    if (copyuser.cart[index].quantity === 1) {
      copyuser.cart.splice(index, 1)
    } else {
      copyuser.cart[index] = { ...copyuser.cart[index], quantity: copyuser.cart[index].quantity - 1 }
    }
    dispatch(asyncupdateuser(copyuser.id, copyuser))
  }

  const total = users?.cart?.reduce((sum, item) => sum + (item?.product?.price || 0) * (item?.quantity || 1), 0)

  if (!users?.cart || users.cart.length === 0) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div className="fade-up" style={{ textAlign: "center" }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" style={{ marginBottom: 20 }}>
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <p className="serif" style={{ fontSize: "1.6rem", margin: "0 0 8px" }}>Your cart is empty</p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: 28 }}>
            Looks like you haven't added anything yet.
          </p>
          <Link to="/" className="btn btn-primary">Browse products</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: "48px 0", maxWidth: 800, margin: "0 auto" }}>
      {/* Header */}
      <div className="fade-up" style={{ marginBottom: 40 }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
          Review
        </p>
        <h1 className="serif" style={{ fontSize: "2.2rem", fontWeight: 400, margin: 0, letterSpacing: "-0.02em" }}>
          Your Cart
        </h1>
      </div>

      {/* Items */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {users?.cart?.map((e, index) => (
          <li
            key={e.productId || index}
            className="fade-up"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "20px 0",
              borderBottom: "1px solid var(--border)",
              animationDelay: `${index * 0.06}s`,
            }}
          >
            {/* Image */}
            <div
              style={{
                width: 80,
                height: 80,
                background: "var(--surface-2, #f5f5f3)",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={e?.product?.image}
                alt={e?.product?.title}
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }}
              />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: "0 0 4px", fontSize: "0.9rem", fontWeight: 400, color: "var(--text-primary)" }}>
                {e?.product?.title}
              </p>
              {e?.product?.category && (
                <span className="tag">{e.product.category}</span>
              )}
            </div>

            {/* Price */}
            <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--text-primary)", minWidth: 70, textAlign: "right" }}>
              ₹{e?.product?.price}
            </p>

            {/* Qty control */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button className="qty-btn" onClick={() => decreaseQuantityHandler(index)}>−</button>
              <span style={{ fontSize: "0.9rem", minWidth: 20, textAlign: "center" }}>{e?.quantity}</span>
              <button className="qty-btn" onClick={() => increaseQuantityHandler(index)}>+</button>
            </div>

            {/* Line total */}
            <p style={{ fontSize: "0.95rem", fontWeight: 500, minWidth: 80, textAlign: "right" }}>
              ₹{(e?.product?.price * e?.quantity).toFixed(0)}
            </p>
          </li>
        ))}
      </ul>

      {/* Summary */}
      <div
        className="fade-up"
        style={{
          marginTop: 32,
          padding: "24px 28px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
            {users.cart.reduce((s, i) => s + i.quantity, 0)} items
          </span>
          <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Subtotal</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="serif" style={{ fontSize: "1.6rem" }}>Total</span>
          <span style={{ fontSize: "1.4rem", fontWeight: 500 }}>₹{total?.toFixed(0)}</span>
        </div>
      </div>
    </div>
  )
}

export default Cart
