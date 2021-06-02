import { Avatar, Card, CardActionArea, CardHeader, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const UserElement = (classes) => ({ userName, firstName, lastName }) => {



    return (
        <Card className={classes.userElementContainer}>
            <CardActionArea>
                <CardHeader
                    avatar={
                        <Link to={'/' + userName + '/'}>
                            <Avatar

                                className={classes.avatar}>
                                <Typography>{userName.split('')[0]}</Typography>
                            </Avatar>
                        </Link>
                    }

                    title={userName}

                    subheader={firstName + " " + lastName}
                />
            </CardActionArea>
        </Card>
    )
}
export default UserElement;