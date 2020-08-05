import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Button, Modal, makeStyles} from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

import { connect } from 'react-redux';
import { toggleSaveMedia } from '../redux/';

const findTitle = (tags) => {
  let tag = tags.find(tag => tag.type === 'search');
  if (tag) {
    return tags.find(tag => tag.type === 'search');
  } else {
    return {
      title: 'NO TAGS'
    };
  }
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 5,
    outline: 'none'
  },
}));

function Media ({ media, saved, video, place, restaurant, event, query, toggleSaveMedia }) {
  const classes = useStyles();
  const toggleMediaSave = () => {
    query = sessionStorage.getItem('query');
    media.mediaType = 'media';
    media.tags = [query];
    toggleSaveMedia('default', media, !saved);
  };

  const togglePlaceSave = () => {
    toggleSaveMedia('default', place, !saved);
  };

  const toggleVideoSave = () => {
    query = sessionStorage.getItem('query');
    let videoObj = {
      id: video,
      tags: [query],
      mediaType: 'video'
    };
    toggleSaveMedia('default', videoObj, !saved);
  };

  const toggleRestaurantSave = () => {
    query = sessionStorage.getItem('query');
    toggleSaveMedia('default', restaurant, !saved);
  }

  const toggleEventSave = () => {
    query = sessionStorage.getItem('query');
    toggleSaveMedia('default', event, !saved);
  }

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">More information</h2>
      <p id="simple-modal-description">
        Coming soon {title}
      </p>
    </div>
  );

  const infoModal = (
    <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
  );

  if (media) {
    query = sessionStorage.getItem('query');
    let mediaName = typeof media.tags[0] === 'string' ? media.tags[0] : query;
    return <div>
      <Card key={media.id}>
        <CardMedia
          component='img'
          height='240'
          image={media.urls.small}
          title={media.description}
        />
        <CardActions>
          <Button size='small' onClick={handleOpen}>{mediaName}</Button>
          <IconButton aria-label='add to favorites' onClick={toggleMediaSave}>
            <FavoriteIcon color={saved ? 'secondary' : 'disabled'} />
          </IconButton>
        </CardActions>
      </Card>
      {infoModal}
    </div>
  } else if (video) {
    return <div>
    <Card>
      <CardMedia
        id='iframeM'
        component='iframe'
        height='237'
        src={`https://www.youtube.com/embed/${video}`}
        title={'video'}
      />
      <CardActions>
        <Button size='small' onClick={handleOpen}> Travel Vlog</Button>
        <IconButton aria-label='add to favorites' onClick={toggleVideoSave}>
          <FavoriteIcon color={saved ? 'secondary' : 'disabled'} />
        </IconButton>
      </CardActions>
    </Card>
    {infoModal}
    </div>
    ;
  } else if (place) {
    return <div>
    <Card key={place.photoUrl}>
      <CardMedia
        component='img'
        height='240'
        image={place.photoUrl}
        title={place.name}
      />
      <CardActions>
        <Button size='small' onClick={handleOpen}>{place.name}</Button>
        <IconButton aria-label='add to favorites' onClick={togglePlaceSave}>
          <FavoriteIcon color={saved ? 'secondary' : 'disabled'} />
        </IconButton>
      </CardActions>
    </Card>
    {infoModal}
    </div>;
  } else if (restaurant) {
    return <div>
    <Card key={restaurant.id}>
      <CardMedia
        component='img'
        height='240'
        image={restaurant.photoUrl}
        title={restaurant.name}
      />
      <CardActions>
        <Button size='small' onClick={handleOpen}>{restaurant.name}</Button>
        <IconButton aria-label='add to favorites' onClick={toggleRestaurantSave}>
          <FavoriteIcon color={saved ? 'secondary' : 'disabled'} />
        </IconButton>
      </CardActions>
    </Card>
    {infoModal}
    </div>;
  } else if (event) {
    return <div>
    <Card key={event.id}>
      <CardMedia
        component='img'
        height='240'
        image={event.photoUrl}
        title={event.name}
      />
      <CardActions>
        <Button size='small' onClick={handleOpen}>{event.name}</Button>
        <IconButton aria-label='add to favorites' onClick={toggleEventSave}>
          <FavoriteIcon color={saved ? 'secondary' : 'disabled'} />
        </IconButton>
      </CardActions>
    </Card>
    {infoModal}
    </div>
  } else {
    return null;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleSaveMedia: (folder, destination, shouldSave) => {
      dispatch(toggleSaveMedia(folder, destination, shouldSave));
    }
  };
};

export default connect(null, mapDispatchToProps)(Media);
