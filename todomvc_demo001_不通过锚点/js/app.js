// (function (window) {
	// 'use strict';

	// Your starting point. Enjoy the ride!
	var vm = new Vue({
		el:'#todoapp',
		data:{
			arr:[
				{taskName:'吃饭',completed:true},
				{taskName:'aaa',completed:false},
				{taskName:'bbb',completed:true},
				{taskName:'ccc',completed:false},
				{taskName:'ddd',completed:true}
			],
			newTask:'',
			toggle:false,
			editingId:-1,
			status:1//值是1:显示全部 2:显示未完成 3:已完成
		},
		methods:{
			addTask:function(){
				console.log(this.newTask);
				if(this.newTask == '')return;
				this.arr.push({taskName:this.newTask,completed:false});
				this.newTask = '';
			},
			removeTask:function(index){
				// console.log(index);
				this.arr.splice(index,1);
			},
			toggleAll:function(){
				// console.log(111);
				var _this = this;
				this.arr.forEach(function(item,index){
					console.log(this.toggle);
					item.completed = _this.toggle;
				})
			},
			editTask:function(index){
				this.editingId = index;
			},
			cancelEditTask:function(){
				this.editingId = -1;
			},
			clearCompleted:function(){
				console.log(111);
				this.arr = this.arr.filter(function(item){return item.completed == false;})
			},
			showAll:function(){
				this.status = 1;
			},
			showActive:function(){
				this.status = 2;
			},
			showCompleted:function(){
				this.status = 3;
			}
		},
		computed:{
			leftNum:function(){
				return this.arr.filter(function(item){return item.completed === false}).length;
			},
			isShow:function(){
				return this.arr.filter(function(item){return item.completed === true}).length > 0 ;
			},
			myArr:function(){
				if(this.status === 1){
					return this.arr;
				}else if(this.status === 2){
					return this.arr.filter(function(item){return item.completed === false;});
				}else if(this.status === 3){
					return this.arr.filter(function(item){return item.completed === true;});
				}
			}
		}
		// 计算属性 监视  'abc' --> 'ABC'
		
	})
// })(window);
