import React, {} from "react";
import {
  IconButton,
  Button,
  Card,
  CardMedia,
  CardActions,
} from '@material-ui/core';

import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { v4 as uuidv4 } from 'uuid';



const useStyles = makeStyles((theme) => ({
  DeleteButton: {
    opacity: '0.15',
    '&:hover': {
      opacity: '1'
    },
  },
  CardActions: {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'space-between',
    padding: '0px 8px'
  },
  Card: {
    margin: '0 0 5px 0'
  }
}));


const BoardCard = React.memo(function (props) {
  const {content, cardIndex } = props
  const classes = useStyles();
  const dragID = uuidv4();

  const handleDeleteCard = e => {
    props.deleteCard(props.tripID, props.listIndex, content.id);
  };

  const cardMediaHelper = (content) => {
    let image = "", title = "";
    if (content.mediaType === 'media') {
      image = content.urls.small;
      title = content.description;
    } else {
      image = content.photoUrl;
      title = content.name;
    }
    return <Card className={classes.Card}>
      <CardMedia
        component="img"
        height={"150"}
        image={image}
        title={title}
      />
      <CardActions className={classes.CardActions}>
        <Button size='small' >{title}</Button>
        <IconButton className={classes.DeleteButton} onMouseDown={handleDeleteCard} color='secondary' size='small'>
          <HighlightOffIcon />
        </IconButton>
      </CardActions>
    </Card>;
  };

  return (
    <Draggable draggableId={dragID} index={cardIndex}>
    {provided => (
      <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      >
      {cardMediaHelper(content)}
      </div>
    )}
    </Draggable>
  );
});

export default connect(null, null)(BoardCard);
