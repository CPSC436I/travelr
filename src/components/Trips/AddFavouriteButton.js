import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
  Button,
  Card,
  CardActions,
  CardMedia,
  Checkbox
} from "@material-ui/core";

import Media from '../Media'
import { fetchFavourites } from '../../redux/'

function AddFavouriteButton({ folders, fetchFavourites }) {
  const [selectedFilters, setFilters] = React.useState([]);
  const [selectedFavourites, setFavourites] = React.useState([]);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const findTitle = (tags) => {
    //   console.log('TAGS: ' + JSON.stringify(tags));
    let tag = tags.find(tag => tag.type === "search");
    if (tag) {
      return tags.find(tag => tag.type === "search");
    } else {
      return {
        title: 'NO TAGS'
      };
    }
  };

  const handleChange = (event) => {
    if (event.target.checked) {
      selectedFavourites.push(event.target.name);
    } else {
      const index = selectedFavourites.indexOf(event.target.name);
      selectedFavourites.splice(index, 1);
    }
    setFavourites([...selectedFavourites]);
    console.log(selectedFavourites);
  };
  const [isOpen, changeIsOpen] = React.useState(false);
  return (
    <div>
      <Dialog open={isOpen} onClose={() => changeIsOpen(false)}>
        <DialogTitle>
          Your favourites
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {folders.folders.length === 0 ? (
              null
            ) :
              folders.folders[0].images.
                filter(image => {
                  if (selectedFilters.length === 0) return true;
                  const intersection = Object.values(image.tags).filter(tag => {
                    return selectedFilters.includes(tag.title);
                  });
                  return intersection.length > 0;
                }).
                map((imgInState) => {
                  return <Grid item xs={4} key={imgInState.id}>
                    <Card key={imgInState.id}>
                      <CardMedia
                        component="img"
                        height={"100"}
                        image={imgInState.urls.small}
                        title={imgInState.description}
                      />
                      <CardActions>
                        <Button size="small" >{findTitle(imgInState.tags).title}</Button>
                        <Checkbox checked={selectedFavourites.includes(imgInState.urls.small)} onChange={handleChange} name={imgInState.urls.small} />
                      </CardActions>
                    </Card>
                  </Grid>
                })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            onClick={() => changeIsOpen(false)}
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
    folders: state.folders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavourites: () => {
      dispatch(fetchFavourites());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFavouriteButton);