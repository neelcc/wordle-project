import jwt from 'jsonwebtoken'

export const auth =  (req,res,next) => {

        const authHeaders = req.headers['authorization'];
        
        const token = authHeaders && authHeaders.split(' ')[1]

        

        console.log(token);
        

        if(token==null) return res.status(404).send({ success : false , message : "Token Null!" })

          jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
                 if(err) return res.status(404).send({ success:false , message:"Token Invalid" })
                        req.user = user
                        next()  
                
        } )  
}