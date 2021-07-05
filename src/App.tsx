import {useState } from "react";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components/macro';
import { lightTheme, darkTheme } from "./themes/themes";
import './App.css';

import NavBurger from "./components/NavBurger";

import Home from "./pages/home";
import About from "./pages/about";
import Schedule from "./pages/schedule";

const Main = styled.div`
  width: 100%;
  height: 100%;
	transition: all 0.3s ease;
	background: ${({ theme }) => theme.background};
	position: relative;
    &.nav-open {
			margin: 0px 0px 0px -200px;
			padding-right: 215px;
		}
		@media screen and (min-width: 768px) {
			margin: 0px auto;
			max-width: 100%;
			position: relative;
			&.nav-open {
				margin: 0px auto;
				padding-right: 0px;
			}
		}
`;

const Header = styled.header`
    width: 100%;
    text-align: center;
    margin: 0;
    height: 90px;
    position: fixed;
    left: 0;
		background: ${({ theme }) => theme.headerBackground};
		transition: all 0.3s ease;
		z-index: 1;
		box-shadow: 0px 2px 10px #dedede;
    &.nav-open {
			margin-left: -200px;
		}
		@media screen and (min-width: 768px) {
			box-shadow: 0px 2px 10px #dedede;
			display: flex;
			justify-content: space-between;
			width: 15%;
			height: 100%;
			flex-direction: column;
			&.nav-open {
				margin-left: 0;
			}
		}
`;

const Logo = styled.h1`
	line-height: 0;
	font-size: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	color: transparent;
	background: url('${({ theme }) => theme.logo}') center no-repeat ${({ theme }) => theme.logoBackground};
	background-size: 75px;
	display: block;
	@media screen and (min-width: 768px) {
		height: 13vw;
		background-size: 60%;
	}
`;

const Nav = styled.nav`
	list-style-type: none;
	position: absolute;
	top: 0;
	right: 0;
	margin: 0px;
	padding: 18px 20px 20px 20px;
	width: 200px;
	height: 130%;
	min-height: 100vh;
	margin-right: -200px;
	text-align: right;
	display: flex;
	flex-direction: column;
	transform: scaleX(0);
	transform-origin: right;
	transition: all 0.3s ease;
	overflow-y: scroll;
	background: ${({ theme }) => theme.navBackground};
		&.nav-open {
			transform: scaleX(1);
			transition: all 0s ease;
			}
	 a {
			font-family: helvetica, arial, sans-serif;
			text-transform: uppercase;
			font-size: 0.9rem;
			text-decoration: none;
			color: ${({ theme }) => theme.navText};
			margin-bottom: 7px;
			transition: all 0.1s linear;
				&.active {
						color: ${({ theme }) => theme.navSelectedText};
			}
				&:first-child {
					margin-top: 10px;
				}
				&:last-child {
					margin-bottom: 100px;
				}
	 }
	@media screen and (min-width: 768px) {
		margin-right: 0;
		align-items: flex-end;
		height: 100%;
		min-height: auto;
		overflow: initial;
		padding: 0px;
		width: 100%;
		transform: scaleX(1);
		position: relative;
		align-items: center;
			a {
				flex-grow: 1;
				margin: 0;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
    		font-size: 1.3rem;
				font-family: Comic Sans MS, sans-serif;
				cursor: pointer;
					&.active {
						@media (hover: hover) {
							&:hover {
								color: ${({ theme }) => theme.navSelectedHoverText};
							}
						}
							&:after {
								width: 0;
								height: 0;
								border-left: 7px solid transparent;
								border-right: 7px solid transparent;
								border-top: 19px solid ${({ theme }) => theme.navSelectedArrow};
								content: '';
								display: block;
								transform: rotate(-90deg);
								margin: 3px 0px 0px 15px;
							}
					}
					@media (hover: hover) {
						&:hover {
							color: ${({ theme }) => theme.navHoverText};
							background: ${({ theme }) => theme.navHoverBackground};
						}
					}

				&:first-child {
					margin-top: 0px;
				}
				&:last-child {
					margin-bottom: 0px;
				}
			}
	}
`;

const DayNightButton = styled.button`
	width: 30px;
	height: 30px;
	display: block;
	background: url('${({ theme }) => theme.themeButton}') center center no-repeat;
	background-size: contain;
	border: 0;
	outline: none;
	position: absolute;
	cursor: pointer;
		@media (hover: hover) {
			&:hover {
				/* background-color: ${({ theme }) => theme.logoBackground}; */
			}
		}
		@media screen and (min-width: 768px) {
			position: relative;
			width: 100%;
			height: 100%;
			background-size: 50px;
			transition: all 0.2s linear;
				&:hover {
					transform: scale(1.2);
				}
		}
`;

const Content = styled.div`
	width: 100vw;
	padding: 90px 15px 80px 15px;
	height: 100%;
	min-height: 100vh;
	h3 {
    font-family: American Typewriter, serif;
    font-size: 1.1rem;
    text-align: center;
    font-weight: 400;
    margin-bottom: 20px;
		color: ${({ theme }) => theme.headers};
  }
  p {
    font-family: American Typewriter, serif;
    margin-bottom: 20px;
		color: ${({ theme }) => theme.bodyText};
    &:empty {
      display: none;
    }
		a {
			color: ${({ theme }) => theme.linkText};
		}
  }
	@media screen and (min-width: 768px) {
		height: 100%;
		padding: 30px 8%;
    width: 85%;
    margin-left: 15%;
			h3 {
				font-size: 2rem;
			}
			p {
				font-size: 1.5rem;
				letter-spacing: 1px;
			}
	}
	@media screen and (min-width: 1000px) {
    /* width: 60vw; */
	}
`;

const Footer = styled.footer`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 45px;
	display: flex;
	align-items: center;
	justify-content: space-between;
  padding: 0px 30px;
	border-top: 1px solid #b4b4b4;
	font-size: 0.8rem;
	background: ${({ theme }) => theme.headerBackground};
	color: ${({ theme }) => theme.bodyText};
	@media screen and (min-width: 768px) {
		width: 85%;
		margin-left: 15%;
	}
`;


function App() {

  const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const closeNav = () => {
		return (isOpen ? setIsOpen(false) : '');
	}

	const [theme, setTheme] = useState('light');
	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}

	const displayYear = new Date().getFullYear();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
      <Main className={(isOpen ? 'nav-open' : '')}>
					<Header onClick={closeNav} className={isOpen ? 'nav-open' : ''}>
						<NavBurger isOpen={isOpen} toggle={toggle} />
						<NavLink exact to="/"><Logo>Hyperlathe</Logo></NavLink>
						<Nav onClick={toggle} className={isOpen ? 'nav-open' : ''}>
							<NavLink exact to="/" title='Home'>Home</NavLink>
							<NavLink exact to="/about" title='About'>About</NavLink>
							<NavLink exact to="/schedule" title='schedule'>Schedule</NavLink>
							<DayNightButton onClick={toggleTheme} title='Toggle light / dark mode' />
						</Nav>
					</Header>
					<Content onClick={closeNav}>
						<Route exact path="/" component={Home} />
						<Route exact path="/about" component={About} />
						<Route exact path="/schedule" component={Schedule} />

					</Content>
					 <Footer><span>© {displayYear} WasteCraft Ltd</span><span>Contact deets</span></Footer>
				</Main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
