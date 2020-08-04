import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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

function Media ({ media, saved, video, place, restaurant, event, query, toggleSaveMedia }) {
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

  if (media) {
    query = sessionStorage.getItem('query');
    return (
      <Card key={media.id}>
        <CardMedia
          component='img'
          height='240'
          image={media.urls.small}
          title={media.description}
        />
        <CardActions>
          <Button size='small' >{media.tags[0]}</Button>
          <IconButton aria-label='add to favorites' onClick={toggleMediaSave}>
            <FavoriteIcon color={saved ? 'secondary' : 'disabled'} />
          </IconButton>
        </CardActions>
      </Card>
    );
  } else if (video) {
    return (<Card>
      <CardMedia
        id='iframeM'
        component='iframe'
        height='237'
        src={`https://www.youtube.com/embed/${video}`}
        title={'video'}
      />
      <CardActions>
        <Button size='small'> Travel Vlog</Button>
        <IconButton aria-label='add to favorites' onClick={toggleVideoSave}>
          <FavoriteIcon color={saved ? 'secondary' : 'disabled'} />

        </IconButton>
      </CardActions>
    </Card>);
  } else if (place) {
    return <Card key={place.photoUrl}>
      <CardMedia
        component='img'
        height='240'
        image={place.photoUrl}
        title={place.name}
      />
      <CardContent />
      <CardActions>
        <Button size='small' >{place.name}</Button>
        <IconButton aria-label='add to favorites' onClick={togglePlaceSave}>
          <FavoriteIcon color={saved ? 'secondary' : 'disabled'} />
        </IconButton>
      </CardActions>
    </Card>;
  } else if (restaurant) {
    return <Card key={restaurant.id}>
      <CardMedia
        component='img'
        height='240'
        image={restaurant.photoUrl}
        title={restaurant.name}
      />
      <CardContent />
      <CardActions>
        <Button size='small' >{restaurant.name}</Button>
        <IconButton aria-label='add to favorites' onClick={toggleRestaurantSave}>
          <FavoriteIcon color={saved ? 'secondary' : 'disabled'} />
        </IconButton>
      </CardActions>
    </Card>;
  } else if (event) {
    return <Card key={event.id}>
      <CardMedia
        component='img'
        height='240'
        image={event.photoUrl}
        title={event.name}
      />
      <CardContent />
      <CardActions>
        <Button size='small' >{event.name}</Button>
        <IconButton aria-label='add to favorites' onClick={toggleEventSave}>
          <FavoriteIcon color={saved ? 'secondary' : 'disabled'} />
        </IconButton>
      </CardActions>
    </Card>;
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
