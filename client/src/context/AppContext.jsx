import { createContext, useContext,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios"

axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL

//EXPLANANTION BELOW --->https://chatgpt.com/c/695cd7cd-7234-8321-a50d-27e6f9614467
export const AppContext=createContext();

//children = whatever components are wrapped inside this provider React automatically passes them as children
export const AppContextProvider=({children})=>{

    const currency=import.meta.env.VITE_CURRENCY;
    const navigate=useNavigate()
        
    const [user,setUser]=useState(null);
    const [isSeller,setIsSeller]=useState(false);
    const [showUserLogin,setShowUserLogin]=useState(false);
    const [products,setProducts]=useState([])

    const [cartItems,setCartItems]=useState({})
    const[searchQuery,setSearchQuery]=useState("")

    
    //fetch seller Status
    const fetchSeller=async()=>{
        try {
            const {data}=await axios.get('/api/seller/is-auth')
            if(data.success){
            setIsSeller(true)
        }else{
            setIsSeller(false)
        }
        } catch (error) {
        setIsSeller(false)
        }
    }

    //fetch User Auth Status,User Data and Cart Items
    const fetchUser=async ()=>{
        try {
            const {data}=await axios.get('/api/user/is-auth');
            if(data.success){
                setUser(data.user);
                setCartItems(data.user.cartItems)
            }else{}
        } catch (error) {
            setUser(null)
        }
    }

    //Fetch all Products
    const fetchProducts=async ()=>{
        try {
            const {data}=await axios.get('api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Add product to cart
    const addToCart=(itemId)=>{
        let cartData=structuredClone(cartItems) //structuredClone used to create deep nested copy of cartItems

        if(cartData[itemId]){
            cartData[itemId]+=1
        }else{
            cartData[itemId]=1
        }
        setCartItems(cartData)
        toast.success("Added to cart")
    }

    //Update Cart item quantity
    const updateCartItem=(itemId,quantity)=>{
        let cartData=structuredClone(cartItems)
        cartData[itemId]=quantity
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    //Remove Product from cart
    const removeFromCart=(itemId)=>{
        let cartData=structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId]-=1
            if(cartData[itemId]===0){
                delete cartData[itemId]
            }
        }
        toast.success('Removed From Cart')
        setCartItems(cartData)
    }

    //Get Cart Items count USED THIS IN navabr cart icon to get count
    const getCartCount=()=>{
        let totalCount=0;
        for(const item in cartItems){
            totalCount=totalCount + cartItems[item]
        }
        return totalCount 
    }
    //get Cart Total Amount
      const getCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            //this items is the id like eg{gHnwej:2}  i.e{id:quantity}
            let itemInfo=products.find((product)=> product._id === item); //got that product OBJ

            if(cartItems[item]>0){
            totalAmount+= itemInfo.offerPrice * cartItems[item];
            }
            
        } 
        return Math.floor(totalAmount * 100) / 100  //This line is used to round a number DOWN to 2 decimal places   
    }

    useEffect(()=>{
        fetchProducts()
        fetchSeller()
        fetchUser()
    },[]) 

    useEffect(()=>{
        //update Databsae Cart Items
        const updateCart=async ()=>{
            try {
                //to update the quantity of order id in cartItems
                const {data}=await axios.post('/api/cart/update',{cartItems})
                if(!data.success){
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        if(user){
            updateCart()  //means when user is logged then only run this on mounting
        }
    },[cartItems]) 

    let value={navigate,user,setUser,isSeller,setIsSeller,showUserLogin,setShowUserLogin,products,currency,addToCart,updateCartItem,removeFromCart,
        cartItems,searchQuery,setSearchQuery,getCartCount,getCartAmount,axios,fetchProducts,setCartItems}

    return <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
}

export const useAppContext =()=>{
    return useContext(AppContext)
}