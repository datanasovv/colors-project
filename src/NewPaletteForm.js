import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withStyles } from '@material-ui/styles';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DraggableColorBox from './DraggableColorBox';

const drawerWidth = 400;

const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: "100vh",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));


function NewPaletteForm({ savePalette, palettes, ...props }) {
    const classes = styles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [curColor, setCurColor] = React.useState('teal');
    const [colors, setColor] = React.useState([]);
    const [newColorName, setNewColorName] = React.useState("");
    const [newPaletteName, setNewPaletteName] = React.useState("")
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
        colors.every(
            ({ name }) => name.toLowerCase() !== value.toLowerCase()
        )
    )
    ValidatorForm.addValidationRule('isColorUnique', value =>
        colors.every(
            ({ color }) => color !== curColor
        )
    )
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
        palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        )
    )

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleColor = (color) => {
        setCurColor(color);
    }
    const addNewColor = () => {
        const newColor = { color: curColor, name: newColorName }
        setColor([...colors, newColor])
        setNewColorName("")
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }
    const updateCurrentColor = (newColor) => {
        handleColor(newColor.hex);
    }
    const handleChangeColorName = (evt) => {
        setNewColorName(
            evt.target.value
        );
    }
    const handleChangePaletteName = (evt) => {
        setNewPaletteName(evt.target.value)
    }
    const handleSubmit = () => {
        let newName = newPaletteName
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, "-"),
            colors: colors
        }
        savePalette(newPalette)
        props.history.push("/")

    }

    return (
        <div className={classes.root} >
            <CssBaseline />
            <AppBar
                position="fixed"
                color="default"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Persistent drawer
                    </Typography>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            name="NewPaletteName"
                            onChange={(evt) => handleChangePaletteName(evt)}
                            validators={["required","isPaletteNameUnique"]}
                            errorMessages={["Enter Palette Name","Name already used"]}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save Palette
                    </Button>
                    </ValidatorForm>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <Typography variant="h4">
                    Design Your Palette
                </Typography>
                <div>
                    <Button variant="contained" color="secondary">
                        Clear Palette
                    </Button>
                    <Button variant="contained" color="primary">
                        Random Color
                    </Button>
                </div>
                <ChromePicker
                    color={curColor}
                    onChangeComplete={(newColor) => updateCurrentColor(newColor)}
                />
                <ValidatorForm onSubmit={addNewColor}>
                    <TextValidator
                        value={newColorName}
                        name="NewColorName"
                        onChange={(evt) => handleChangeColorName(evt)}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["Enter a color name", "Color name must be unique", "Color already used!"]}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        style={{ backgroundColor: curColor }}
                    >
                        ADD COLOR
                     </Button>
                </ValidatorForm>

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                {colors.map(color => (
                    <DraggableColorBox color={color.color} name={color.name} />
                ))}

            </main>
        </div >
    );
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm)
