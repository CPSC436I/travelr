import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  Button,
  Card,
  CardActions,
  CardMedia,
  Checkbox
} from '@material-ui/core';

import { fetchFavourites } from '../../redux/';

function AddFavouriteButton({ folders, fetchFavourites, addCards, tripID, listIndex }) {
  const [selectedFavourites, setFavourites] = React.useState([]);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  const handleChange = (event) => {
    if (event.target.checked) {
      selectedFavourites.push(event.target.name);
    } else {
      const index = selectedFavourites.indexOf(event.target.name);
      selectedFavourites.splice(index, 1);
    }
    setFavourites([...selectedFavourites]);
  };
  const [isOpen, changeIsOpen] = React.useState(false);

  const handleAddCards = () => {
    if (folders.folders.length === 0) {
      changeIsOpen(false);
      return;
    }
    const selectedCards = folders.folders[0].images.filter(img => {
      if (img.mediaType === 'media') {
        return selectedFavourites.includes(img.urls.small);
      } else {
        return selectedFavourites.includes(img.photoUrl);
      }
    });
    addCards(selectedCards, tripID, listIndex);
    changeIsOpen(false);
  };
  return (
    <div>
      <Dialog open={isOpen} onClose={() => changeIsOpen(false)}>
        <DialogTitle>
          Your favourites
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {folders.folders.length === 0 ? (null) : folders.folders[0].images
              .map((imgInState) => {
                switch (imgInState.mediaType) {
                  case 'media':
                    return <Grid item xs={4} key={imgInState.id}>
                      <Card key={imgInState.id}>
                        <CardMedia
                          component='img'
                          height={'100'}
                          image={imgInState.urls.small}
                          title={imgInState.description}
                        />
                        <CardActions>
                          <Button size='small' >{imgInState.tags[0]}</Button>
                          <Checkbox checked={selectedFavourites.includes(imgInState.urls.small)} onChange={handleChange} name={imgInState.urls.small} />
                        </CardActions>
                      </Card>
                    </Grid>
                  case 'place':
                    return <Grid item xs={4} key={imgInState.id}>
                      <Card key={imgInState.id}>
                        <CardMedia
                          component='img'
                          height={'100'}
                          image={imgInState.photoUrl}
                          title={imgInState.name}
                        />
                        <CardActions>
                          <Button size='small' >{imgInState.tags[0]}</Button>
                          <Checkbox checked={selectedFavourites.includes(imgInState.photoUrl)} onChange={handleChange} name={imgInState.photoUrl} />
                        </CardActions>
                      </Card>
                    </Grid>
                  case 'restaurant':
                    return <Grid item xs={4} key={imgInState.id}>
                      <Card key={imgInState.id}>
                        <CardMedia
                          component='img'
                          height={'100'}
                          image={imgInState.photoUrl}
                          title={imgInState.name}
                        />
                        <CardActions>
                          <Button size='small' >{imgInState.tags[0]}</Button>
                          <Checkbox checked={selectedFavourites.includes(imgInState.photoUrl)} onChange={handleChange} name={imgInState.photoUrl} />
                        </CardActions>
                      </Card>
                    </Grid>
                  default:
                    return null;
                }
              })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            variant='contained'
            onClick={() => handleAddCards()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Button onClick={() => changeIsOpen(true)}>Add favourite</Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    folders: state.folders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavourites: () => {
      dispatch(fetchFavourites());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFavouriteButton);
