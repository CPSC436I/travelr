import React, {} from "react";
import {
  IconButton,
  Card,
  CardMedia
} from '@material-ui/core';

import { Draggable } from "react-beautiful-dnd";
import { deleteCard } from "../../redux/trips/tripsActions";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const useStyles = makeStyles((theme) => ({
  CardContainer: {
    margin: '0 0 8px 0',
    position: 'relative',
  },
  DeleteButton: {
    position: 'absolute',
    margin: '0 0 0 250px',
    'z-index': '1',
    opacity: '0.2',
    '&:hover': {
       opacity: '1'
    },
  }
}));


const BoardCard = React.memo(function (props) {
  const {content, cardIndex } = props
  const classes = useStyles();
  // const [card, setCard] = useState({});

  // useEffect(()=>{
  //
  // },[trips]);

  const handleDeleteCard = e => {
    console.log("delete "+ content.id);
    props.deleteCard(props.tripID, props.listIndex, content.id);
  };

  return (
    <Draggable draggableId={content.id} index={cardIndex}>
    {provided => (
      <div className='CardContainer'
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      >
      <Card>
      <IconButton className={classes.DeleteButton} onMouseDown={handleDeleteCard}>
        <HighlightOffIcon />
      </IconButton>
      <CardMedia
        component="img"
        height={"150"}
        image={content.urls.small}
        title={content.description}
      />
      </Card>
      </div>
    )}
    </Draggable>
  );
});

// const mapStateToProps = (state) => {
//   return {
//     trips: state.trips,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     deleteCard: (tripID, listIndex, contentID) => {
//       dispatch(deleteCard(tripID, listIndex, contentID));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(BoardCard);
export default connect(null, null)(BoardCard);
