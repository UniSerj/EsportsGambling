import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Main = () => (
	<header>
		<nav>
			<li><Link to='/'>Home</Link></li>
		</nav>
	</header>
);

export default Main;