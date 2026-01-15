import { createContext, useContext,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";


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

    //Fetch all Products
    const fetchProducts=async ()=>{
        setProducts(dummyProducts)
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
    },[]) 

    let value={navigate,user,setUser,isSeller,setIsSeller,showUserLogin,setShowUserLogin,products,currency,addToCart,updateCartItem,removeFromCart,
        cartItems,searchQuery,setSearchQuery,getCartCount,getCartAmount}

    return <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
}

export const useAppContext =()=>{
    return useContext(AppContext)
}