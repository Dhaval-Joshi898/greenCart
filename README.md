- Installed tailwind css for vite AND SETUP IN PROJECT
- INSTALLED  react-router-dom
- Installed react-hot-toast(library) for toast notification 
- installed outline font and added that in index.css with theme color primary
- setting browser router by wrapping app inside it <broswerRouter> <App/> <broswerRouter/> 
- Setting Context for react  and setup AppCOntextProvider in main.jsx 


# FrontEnd Part
- prebuiltUI used 
- Completed Navbar
- Completed Main Banner
- Completed Categories
- NOTE:Check and correct FetchPRoduct function useEffect
# structuredClone: In context APi structuredClone used to make deep copy  *IMPORTANT*
- after this have function to Add to cart(created state variables and function to changing that variables)
- Added Toaster to App.jsx below navbar so all the notification will appear there
-add to upate remove cart ->>add ened itmeID check further
- delete used to remove property from JS OBJECT
- Now in ProductCard i have props product which is coming form BestSeller and in BestSeller tis product are coming from Appcontext where on 
  useEffefct we are updating products using setProducts(dummyProducts)
- onclick stopPropagation event to stop parent div to click and only child can be clicked (event bubbling)

# cart functionality AppContext store( cartItems and setCartItems)
- store i have cartItems initial it is {} and then i deep clone it so ewhen items cartData[itemID] this create
cartData={"fjkdj(id)":2}  so like {prodId:quantity}  so cartItems is for prodId with quantity  and thenUPdate cartItems

# NOte check about e.stopPropagation() and e.preventDefault()

- in All products page have filteredProduct based on if searchQuery is there any letter or else it is showing all products
- and in Navbar searchQuery search bar onCHange input setSearchQuery(e.target.value) and useEffect on mount when searchQuery changes it should redirect it to /pages where my AllProducts Component is there and inside it there is also a filtered product  BASED ON SEARCH QUERY displaying it in that page

# on CLick on category a new path goes porducts/fruits or vegetables that page is created ProductCategory.jsx
now on clinking any product it should open individual product page(like description price many images) # ProductDetials.jsx

# Creating Product Details page(ProductDetails.jsx)

# Creating Cart Page and checkout

<!-- # IMP Error: Calling setState synchronously within an effect can trigger cascading renders Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. -->

# Form input change handler one function for every input field (AddAddress.jsx)
<!-- -    const handleChange=(e)=>{
        const {name,value}=e.target;
        setAddress((prevAddress)=>({
            ...prevAddress,
            [name]:value
        }))

    } -->

# Creating My Orders page
- when write max-md:flex-col it means like it will work for phone and sm screen less than md

# Now Starting with Seller Login page ,and navbar addProducts by seller
- in Seller LAyout i have <Outlet>(from react router dom) at end

# COMPLETED FRONTEND 

#  Starting with BackEnd
- installed npm install bcryptjs cloudinary cookie-parser cors dotenv express jsonwebtoken mongoose multer stripe
- installed dev dependency nodemon

- res.send({ name: "mango", quantity: 1 })Express converts this to JSON automatically.
- Used middleware at first in server.js expres.json() cookieparser cors  using app.use()

- folder struture  inside server folder other folders created like models,controllers middlewares,configs, routes
- created .env file
- inside added mongodb_uri with password and name of user for accessign db and then in network allowed db acess form anywhere made ip 00000:00
- import connectDB from config db.js to server.js at first and called it