import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/main'
import Home from '../components/home'

import Buy from '../components/buy'
import Sell from '../components/sell'

import Advertise from '../components/advertise'

import AboutUs from '../components/about_us'
// import details from '../components/details'


import Sellhim from '../components/sellhim'
import SellSuccess from '../components/sellSuccess'
import Buyhim from '../components/buyhim'
import BuySuccess from '../components/buySuccess'
import shopChat from '../components/shopChat'

//import BuySuccess from '../components/buySuccess'
import Buyadvertise from '../components/Buyadvertise'
import Selladvertise from '../components/Selladvertise'
import announcement from '../components/announcement'
import mall from '../components/mall'

import orderManagement from '../components/orderManage'
import adManage from '../components/adManage'
import usercenter from '../components/usercenter'


import User from '../components/user/user'
import Login from '../components/user/login'
import Registered from '../components/user/registered'
import Findpassword from '../components/user/findpassword'

Vue.use(Router)

export default new Router({
	mode: "history",
  routes: [
  	{
      path: '/',
      name: 'main',
      component: Main,
      children:[
      	{
	      path: '/',
	      name: 'home',
	      component: Home
	    },
	    {
	    	path:'/buy',
	    	name:'buy',
	    	component:Buy
			},

			{
				path:'/user',
				name:'User',
				component:User,
				redirect:'/login',
				children:[
					{
						path:'/login',
						name:'login',
						component:Login
					},
					{
						path:'/registered',
						name:'registered',
						component:Registered
					}
				]
			},
			


	    {
	    	path:'/sell',
	    	name:'sell',
	    	component:Sell
	    },
	    {
	    	path:'/advertise',
	    	name:'advertise',
	    	component:Advertise
			},

			{
	    	path:'/mall',
	    	name:'mall',
	    	component:mall
			},
			{
	    	path:'/announcement',
	    	name:'announcement',
				component:announcement,
				// redirect:"/details"",
				children: [
					// {
					// 	path:"/details/:id",
					// 	component:details,
					// }
				]
			},
			
			{
	    	path:'/shopChat/:id',
	    	name:'shopChat',
	    	component:shopChat
	    },
	    {
	    	path:'/aboutUs',
	    	name:'aboutUs',
	    	component:AboutUs
	    },
	    {
	    	path:'/sellhim',
	    	name:'sellhim',
	    	component:Sellhim
	    },
	    {
	    	path:'/SellOrder',
	    	name:'SellOrder',
	    	component:SellSuccess
	    },
	    {
	    	path:'/buyhim',
	    	name:'buyhim',
	    	component:Buyhim
	    },
	    {
	    	path:'/PurchaseOrder',
	    	name:'PurchaseOrder',
	    	component:BuySuccess
	    },
		{
			path:'/orderManagement',
			name:'orderManagement',
			component:orderManagement
		},
		{
			path:'/advertisingManagement',
			name:'adManage',
			component:adManage
		},
		{
			path:'/usercenter',
			name:'usercenter',
			component:usercenter
		},
		{
			path:'/buyadvertise',
			name:'buyadvertise',
			component:Buyadvertise
		},
		{
			path:'/selladvertise',
			name:'selladvertise',
			component:Selladvertise
		}
      ]
    },
  //   {
	// 	path:'/user',
	// 	name:'User',
	// 	component:User,
	// 	redirect:'/login',
	// 	children:[
	// 		{
	// 			path:'/login',
	// 			name:'login',
	// 			component:Login
	// 		},
	// 		{
	// 			path:'/registered',
	// 			name:'registered',
	// 			component:Registered
	// 		}
	// 	]
	// },
	{
		path:'/findpassword',
		name:'findpassword',
		component:Findpassword
	},
	
  ],
  	scrollBehavior (to, from, savedPosition) {
	  return { x: 0, y: 0 }
	}
})
