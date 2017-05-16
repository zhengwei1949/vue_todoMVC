// (function (window) {
	// 'use strict';

	// Your starting point. Enjoy the ride!
	var myStatus = 1;
	switch(location.hash){
		case '#/active':
			myStatus = 2;
			break;
		case '#/completed':
			myStatus = 3;
			break;
		default :
			myStatus = 1;
	}
	// console.log(typeof myStatus);
	var vm = new Vue({
		el:'#todoapp',
		data:{
			arr:JSON.parse(localStorage.getItem('todos') || '[]'),
			newTask:'',
			toggle:false,
			editingId:-1,
			myStatus:myStatus//值是1:显示全部 2:显示未完成 3:已完成
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
				this.myStatus = 1;
			},
			showActive:function(){
				this.myStatus = 2;
			},
			showCompleted:function(){
				this.myStatus = 3;
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
				console.log(typeof this.myStatus)
				if(this.myStatus === 1){
					return this.arr;
				}else if(this.myStatus === 2){
					return this.arr.filter(function(item){return item.completed === false;});
				}else if(this.myStatus === 3){
					return this.arr.filter(function(item){return item.completed === true;});
				}
			}
		}
		// 计算属性 监视  'abc' --> 'ABC'
		,
		watch:{
			myArr:{
				handler:function(){
					// console.log(111);
					localStorage.setItem('todos',JSON.stringify(this.arr));
				},
				deep:true
			}
		},
		directives: {
			'todo-focus': function (el, binding) {
			if (binding.value) {
				el.focus()
			}
			}
		}		
	})


	window.addEventListener('hashchange',function(){
		switch(location.hash){
		case '#/active':
			vm.myStatus = 2;
			break;
		case '#/completed':
			vm.myStatus = 3;
			break;
		default :
			vm.myStatus = 1;
		}
	});
// })(window);
