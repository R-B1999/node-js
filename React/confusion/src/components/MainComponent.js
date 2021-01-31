import React,{ Component } from 'react';
import Header from  './HeaderComponent';
import Footer from  './FooterComponent';
import Menu from './MenuComponent';
import DishComponent from './Dishescomponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes.js';
import { COMMENTS } from '../shared/comments.js';
import { PROMOTIONS } from '../shared/promotions.js';
import { LEADERS } from '../shared/leaders.js';
import Home from './HomeComponent';
import About from './AboutComponent';
import {Switch,Route,Redirect} from 'react-router-dom';


class Main extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            dishes: DISHES,
            comments:COMMENTS,
            promotions:PROMOTIONS,
            leaders:LEADERS
        };
        
    }
    
     

    render()
    {
     const Homepage=()=>{
         return(
             <>
         <Home dish={this.state.dishes.filter((dish)=>dish.featured)}
         prom={this.state.promotions.filter((promo)=>promo.featured)}
         leader={this.state.leaders.filter((lead)=>lead.featured)}
         />
         
        {/* optional we can put any no.of components that we want to call with home component  */}
         </>
         );
        
     }
      const DishWithId=({match})=>
      {
          return(
          <DishComponent dish={this.state.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId))[0]}
          comments={this.state.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId))}/>
          );
        }  
    return (

      <div>
      <Header/> 

<Switch>
   <Route  path="/home" component={Homepage}/>
   <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes}/>}/>
   <Route exact path="/contactus" component={Contact}/>
   <Route path="/menu/:dishName/:dishId" component={DishWithId}/>
   <Route path="/aboutus" component={()=> <About leaders={this.state.leaders}/>}/>
   <Redirect to="/home"/>
</Switch>
      <Footer />
      </div>
  );
}
}
export default Main;
