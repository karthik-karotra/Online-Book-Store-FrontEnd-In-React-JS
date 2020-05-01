import React from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import MenuBookIcon from "@material-ui/icons/MenuBookSharp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCartOutlined";

const useStyles = makeStyles(theme => ({

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
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: "0",
        width: "80%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(18),
            width: "auto"
        }
    },
    searchIcon: {
        width: theme.spacing(6),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 10),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: 400
        }
    },
    cartIcon: {
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
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search Your Book Here"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{"aria-label": "search"}}
                        />
                    </div>
                    <ShoppingCartIcon edge="end" className={classes.cartIcon}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}