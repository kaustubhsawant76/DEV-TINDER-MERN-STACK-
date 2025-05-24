# DevTinder API's

## authRouter
-POST /signup
-POST /login
-POST /logout

 ## profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

 ## connectionRequestRouter
 -POST /request/send/:status/:userId
 -POST /request/review/:status/:requestId
<!-- -POST /request/send/interested/:userId -->
<!-- -POST /request/send/ignored/:userId -->
<!-- -POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId -->

## userRouter
-GET /user/requests
-GET /user/connections
-GET /user/feed -Gets you the profiles of other users on platform


Status :Ignored ,Interseted ,accepted ,rejected

