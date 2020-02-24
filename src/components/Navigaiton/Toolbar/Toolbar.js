import React from 'react' ;
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigaiton/NavigationItems/NavigationItems';
import DrawerToggle from '../SideDraw/DrawerToggle/DrawerToggle';
const toolBar = props => {
    return (
       <header className={classes.Toolbar}>
           <DrawerToggle clicked={props.drawerToggle}/>
           <div className={classes.Logo}>
            <Logo/>
           </div>
           <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth}/>
           </nav>
       </header>

        
    )
}

export default toolBar ; 