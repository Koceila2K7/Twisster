import { makeStyles } from '@material-ui/core';
const makeStyle = makeStyles(theme => ({

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    root: {
        maxHeight: 650,
    },

    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    boxContainer: {
        height:"100vh",
        margin:10,
        width:'80vh',
        padding:10
    },
    writeCommenteContainer:{
        padding:10,
        boxSizing:"border-box",
        width:"100%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        
    },
    commenteTextFiled:{
        flex:8
    }
}))

export default makeStyle;