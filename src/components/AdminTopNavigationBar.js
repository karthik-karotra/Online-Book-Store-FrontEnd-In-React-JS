import React from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuBookIcon from "@material-ui/icons/MenuBookSharp";
import {ExitToApp} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({

    grow:{

    },
    bookIcon: {
        fontSize: "36px",
        [theme.breakpoints.up("sm")]: {
            padding: "0 0 0 10%",
            fontSize: "36px"
        }
    },
    title: {
        display: "none",
        paddingLeft: "1%",
        fontSize: "120%",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    exitToApp: {
        padding: "0 0 0 18%"
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    }
}));


export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{backgroundColor: "rgb(51, 51, 255)"}}>
                <Toolbar>
                    <MenuBookIcon edge="start" className={classes.bookIcon}/>
                    <Typography className={classes.title} variant="h6" noWrap>
                        The Country Bookshop
                    </Typography>
                    <ExitToApp edge="end" className={classes.exitToApp}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}