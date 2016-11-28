window.React=require('react');

let React = require('react');
let ReactDOM = require('react-dom');
let AppComponent = require('./components/productBox.js');
// var example02=require('./components/example02.js');

ReactDOM.render(<AppComponent />, document.getElementById('content'));

// example02
var names=["alice","emily","kate"];
ReactDOM.render(
	<div>
	{
		names.map(function (name, i){
			return <p key={i}>hello,{name}</p>
		})
	}
	</div>,
	document.getElementById('example02')
);


// example03
var Example03=React.createClass({
	render: function(){
		return <h2>hello {this.props.name}</h2>;
	}
});
ReactDOM.render(
	<Example03 name="johns"/>,
	document.getElementById("example03")
);


//example04
var NoteList=React.createClass({
	render:function(){
		return (
			<ol>
			{
				React.Children.map(this.props.children,function(child){
					return <li>{child}</li>;
				})
			}
			</ol>
		);
	}
});
ReactDOM.render(
	<NoteList>
		<span>hello</span>
		<span>liniu</span>
	</NoteList>,
	document.getElementById('example04')
);


//example05
var data="123";
var Mytitle=React.createClass({
	propTypes:{
		title:React.PropTypes.string.isRequired,
	},
	render:function(){
		return <h2>{this.props.title}</h2>;
	}
});

ReactDOM.render(
	<Mytitle title={data}/>,
	document.getElementById('example05')
);


//example06
var Mycomponent=React.createClass({
	handleClick:function(){
		this.refs.mytext.focus();
	},
	render:function(){
		return (
			<div>
				<input type="text" ref="mytext" />
				<input type="button" value="focus the text input" onClick={this.handleClick} />
			</div>
		);
	}

});
ReactDOM.render(
	<Mycomponent />,
	document.getElementById('example06')
);


//example07
var LikeButton=React.createClass({
	getInitialState:function(){
		return {liked:false};
	},
	handleClick:function(){
		this.setState({liked:!this.state.liked});
	},
	render:function(){
		var text=this.state.liked?"like":"have\'t like";
		return(
			<p onClick={this.handleClick}>
				you {text} this click to toggle
			</p>
		);
	}
});
ReactDOM.render(
	<LikeButton />,
	document.getElementById('example07')
)


//example08
var Input=React.createClass({
	getInitialState:function(){
		return {value:"hello"};
	},
	handleChange:function(event){
		this.setState({value: event.target.value});
	},
	render:function(){
		var value=this.state.value;
		return(
			<div>
				<input type="text" value={value} onChange={this.handleChange}/>
				<p>{value}</p>
			</div>

		);
	}
});
ReactDOM.render(
	<Input/>,
	document.getElementById('example08')

);


//example09
var Hello=React.createClass({
	getInitialState:function(){
		return {
			opacity: 1.0
		};
	},
	componentDidMount:function(){
		this.timer=setInterval(function(){
				var opacity=this.state.opacity;
				opacity -=.05;
				if(opacity<0.1){
					opacity=1.0;
				}
				this.setState({
					opacity:opacity
				});
		}.bind(this),100);
	},
	render:function(){
		return(
			<div style={{opacity:this.state.opacity}}>
				hello {this.props.name}
			</div>
		);
	}
});
ReactDOM.render(
	<Hello name="lili"/>,
	document.getElementById('example09')

);


//example10
var Usergist=React.createClass({
	getInitialState:function(){
		return {
			username:"",
			lastgisturl:""
		};
	},
	componentDidMount:function(){
		$.get(this.props.source,function(result){
			var lastGist=result[0];
			if(this.isMounted()){
				this.setState({
					username:lastGist.owner.login,
					lastgisturl:lastGist.html_url
				});
			}
		}.bind(this));
	},
	render:function(){
		return <h4>{this.state.username}'s last <a href={this.state.lastgisturl}>gist</a> is here</h4>;

	}
});
ReactDOM.render(
	<Usergist source="https://api.github.com/users/octocat/gists"/>,
	document.getElementById('example10')
);


//example11
var Rrpolist=React.createClass({
	getInitialState:function(){
		return{
			loading:true,
			error:null,
			data:null
		};
	},
	componentDidMount(){
		this.props.promise.then(
			value=>this.setState({loading:false,data:value}),
			error=>this.setState({loading:true,error:error})
		);
	},
	render:function(){
		if(this.state.loading){
			return <span>loading……</span>;
		}else if(this.state.error!==null){
			return <span>Error:{this.state.error.message}</span>
		}else{
			var repos=this.state.data.items;
			var repolist=repos.map(function(repo,index){
				return (
					<li key={index}><a href={repo.html_url}>{repo.name}</a>
						({repo.stargazers_count} stars)<br/>
						{repo.description}</li>
				);
			});
			return(
				<main>
					<h1>most popular javascript projects in github</h1>
					<ol>{repolist}</ol>
				</main>
			);
		}
	}
});
ReactDOM.render(
	<Rrpolist promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}/>,
	document.getElementById('example11')

)