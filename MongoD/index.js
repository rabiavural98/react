const mongoose =require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test').then(()=>console.log('Database Is Connected')).catch((err)=>console.log(err));

//Schema (Shape of a Document)
//Document,Collection,Database
 const userSchema = new mongoose.Schema({
     name: String,
     age:Number,
     isMarried:Boolean,
     salary:Number,
     gender:String,
})
 const User =mongoose.model('User',userSchema);
 
 //Comparison Operator
//eq    equal	
//ne    not equal	
// gt   greater than	
// gte  greater than or equal to	
// lt   less than	
// lte  less than or equal to	
// in   in an array
// nin  not in an array

//Problem I will Solve
// Find those users whose age is greather then 40 or they are unmarried 
// Find Only Name
// Shorted them by name

async function fetchInformation() {
await User.deleteMany({isMarried:false});
}
 fetchInformation();
 
 // async function storeInformation(){
 //     const user=new User({
 //         name: 'Ariyan',
 //         age:40,
 //         isMarried:false,
 //         salary:50000,
 //         gender:'Male',
 //     });
 //     await user.save();
 //     console.log(user);
 // }
 // storeInformation();