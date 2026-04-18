// import { useSelector } from "react-redux";

// import { Navigate, useParams } from "react-router-dom"
// import { useForm } from "react-hook-form"
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux"
// import { useEffect } from "react";
// import { asyncdeleteuser, asynclogoutuser, asyncupdateuser } from "../../store/actions/userActions";

// const UserProfile = () => {

//  const navigate = useNavigate()
// // const {id} = useParams
// const user = useSelector((state) => state.usersReducer?.user);
//     console.log(user)

//     const { register, reset, handleSubmit } = useForm();
//      useEffect(() => {
//     if (user) {
//       reset({
        
//         username: user?.username,
//         email: user?.email,
//         password: user?.password
//       });
//     }
//   }, [user, reset]);

//  const dispatch = useDispatch()
   
   
//     const UpdateUserHandler = (formData) => {
//       const updatedUser = {
//     ...user,      // keep original user (includes id)
//     ...formData   // overwrite fields from form
//   }

//   dispatch(asyncupdateuser(user.id, updatedUser))

//   console.log("Updated user:", updatedUser)
//   console.log("User ID:", user.id)

//     }


//  const logoutUserHandler = ()=>{
//         dispatch(asynclogoutuser(user.id))
//     navigate("/login")
//     }


//     const deleteHandler = ()=>{
//         dispatch(asyncdeleteuser(user.id))
//     navigate("/login")
//     }



//   return user? ( 
//     <div>

//         <h1 className="font-thin text-gray-500 text-4xl">{user.username}</h1>
//         <h1 className="font-thin  text-gray-500 text-1xl">{user.email}</h1>
//         <hr className="my-10"/>

//               <form onSubmit={handleSubmit(UpdateUserHandler)} className="w-full flex flex-col justify-start items-start">

//                     <input
//                         {...register("username" )}
//                         className='mb-3 outline-0 border-b p-2 text-3xl'
//                         type="text" placeholder='John Doe' 
//                         autoComplete=""/>


//                     <input
//                         {...register("email")}
//                         className='mb-3 outline-0 border-b p-2 text-3xl' type="email" 
//                         placeholder='JohnDoe@gmail.com' 
//                         autoComplete=""
//                      />

//                     <input
//                         {...register("password" )}
//                         className='mb-3 outline-0 border-b p-2
//           text-3xl'
//                         type="password"
//                         placeholder="************"
//                         autoComplete="current-password"
//                         />

//                     <button className=" mt-5 px-4 py-4 bg-blue-400 text-white rounded">Update User</button>


//                      <button type="button"
//                       onClick={logoutUserHandler}
//                        className=" mt-5 px-4 py-4 bg-red-400 text-white rounded">Logout User</button>

//                      <button type="button"
//                       onClick={deleteHandler}
//                        className=" mt-5 px-4 py-4 bg-red-800 text-white rounded">Delete User</button>
//                 </form>


//     </div>
//   ):(
//     "Loading..."
// )
// }

// export default UserProfile


import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { asyncdeleteuser, asynclogoutuser, asyncupdateuser } from "../../store/actions/userActions"

const UserProfile = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.usersReducer?.user)
  const { register, reset, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (user) {
      reset({ username: user?.username, email: user?.email, password: user?.password })
    }
  }, [user, reset])

  const UpdateUserHandler = (formData) => {
    const updatedUser = { ...user, ...formData }
    dispatch(asyncupdateuser(user.id, updatedUser))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const logoutUserHandler = () => {
    dispatch(asynclogoutuser(user.id))
    navigate("/login")
  }

  const deleteHandler = () => {
    dispatch(asyncdeleteuser(user.id))
    navigate("/login")
  }

  if (!user) return (
    <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "var(--text-muted)" }}>Loading…</p>
    </div>
  )

  return (
    <div style={{ padding: "48px 0", maxWidth: 560 }}>
      {/* Page header */}
      <div className="fade-up" style={{ marginBottom: 40 }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
          Account
        </p>
        <h1 className="serif" style={{ fontSize: "2.2rem", fontWeight: 400, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
          {user.username}
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: 0 }}>{user.email}</p>
        {user.isAdmin && (
          <span className="tag" style={{ marginTop: 10 }}>Admin</span>
        )}
      </div>

      <hr className="divider" />

      {/* Edit form */}
      <div className="fade-up fade-up-d1">
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 28 }}>
          Edit profile
        </p>

        <form onSubmit={handleSubmit(UpdateUserHandler)}>
          <div style={{ marginBottom: 28 }}>
            <label className="field-label">Full name</label>
            <input {...register("username")} className="field" type="text" placeholder="John Doe" autoComplete="off" />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label className="field-label">Email address</label>
            <input {...register("email")} className="field" type="email" placeholder="you@example.com" autoComplete="off" />
          </div>

          <div style={{ marginBottom: 36 }}>
            <label className="field-label">Password</label>
            <input {...register("password")} className="field" type="password" placeholder="••••••••" autoComplete="current-password" />
          </div>

          <button type="submit" className="btn btn-primary">
            {saved ? "✓ Saved" : "Save changes"}
          </button>
        </form>
      </div>

      <hr className="divider" />

      {/* Danger zone */}
      <div className="fade-up fade-up-d2">
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 20 }}>
          Session & account
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button type="button" onClick={logoutUserHandler} className="btn btn-outline">
            Sign out
          </button>
          <button type="button" onClick={deleteHandler} className="btn btn-danger">
            Delete account
          </button>
        </div>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 12 }}>
          Deleting your account is permanent and cannot be undone.
        </p>
      </div>
    </div>
  )
}

export default UserProfile
