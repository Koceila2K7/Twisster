import HomeIcon from '@material-ui/icons/HomeRounded';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

import EmailIcon from '@material-ui/icons/Email';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';

import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';


const navigations = [
    {
        nom: "Accueil",
        icon: () => <HomeIcon color={"primary"} />,
        outlinedIcon: () => <HomeOutlinedIcon color={"inherit"} />,
        action: history => () => history.push('/home'),
        current: false
    },
    {
        nom: "Message",
        icon: (current) => <EmailIcon color={"primary"} />,
        outlinedIcon: () => <EmailOutlinedIcon color={"inherit"} />,
        action: history => () => history.push('/message'),
        current: true

    },
    {
        nom: "Profil",
        icon: (current) => <PersonIcon color={"primary"} />,
        outlinedIcon: () => <PersonOutlineOutlinedIcon color={"inherit"} />,
        action: (history, username) => () => history.push('/' + username),
        current: false

    },
];
export default navigations