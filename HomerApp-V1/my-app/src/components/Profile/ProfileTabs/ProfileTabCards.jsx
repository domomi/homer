import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    width: '45%',
    height: '20%',
  },
});

export default function MediaCard(props) {
  const { pic1, pic2, title, link} = props
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <img src={pic1} className={classes.media} />
          <img src={pic2} className={classes.media} />
        </CardContent>
      </CardActionArea>

      <CardActions>

        <Link to={link}>
        <Button size="small" color="primary">
        Learn More
        </Button>
        </Link>
      </CardActions>

    </Card>
  );
}