# after DB connect 
- creating collection, User.js created in Models to create User schema and User Model from the schema
- Now creating the controller function for User model
- creating userController whoch will ahve lal the like if on an api what function to be performed
<!-- //eg after -->
- after creating controller function CREATE routes in ROutes FOlder userROuter thenfor that particular route this controller function to run
- so in userROuer u will use .post with /register and thne in main u will use /api/user with.use(/api/user,userROuter) which make /api/user  /register
- created login api in userCController and added endpoint is userRouter
# to create api endpoints that will verify the user if the user is logged in or not if loggedin it will provide the user details-
# and to get user detials we need to provide USER id(then fetch from db)and to get id we extract from TOKEN and token is added in cookie
# to decode token we need to create middleware ,MIDDLEWARE is the function which executes before executing controller function of any route
# completed user controller and user router then in server.js added userRouter

# smae did with seller part also like login isSellerAuth,logout

# Creating Product schema
# created cloudinary config with api secret key ,password cloud name set up in config file and connect in server.js just like DB
#starting with porductController like addProduct,productList,getProductById(for single product data)
# setting multer 

# created all the PRoduct controller for adding products gettign list and single prodict get
# created Product router and then in particular route added controller Function and before that added multer,authSeller,and then addProduct(controller function)
->>> productRouter.post('/add',upload.array([images]),authSeller,addProduct)
