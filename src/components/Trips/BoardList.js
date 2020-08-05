import React from "react";
import BoardCard from "./BoardCard";
import { Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddFavouriteButton from './AddFavouriteButton';

const useStyles = makeStyles((theme) => ({
  DayContainer: {
    'background-color': '#e8ebed',
    'border-radius': '10px',
    width: '300px',
    padding: '8px',
    height: '100%',
    margin: '0 10px 0 0',
  },
  DayBar: {
    display: 'flex',
    'justify-content': 'space-between'
  },
  DayName: {
    margin: '5px 0 0 5px',
  }
}));

const bList = React.memo(function BoardList(props) {
  const classes = useStyles();
  const tripID = props.trip._id;
  const day = props.day;

  const mapCards = () => {
    if (day) {
      return day.content.map((content, index) => {
        return (
          <BoardCard
          content={content}
          tripID={tripID}
          listIndex={props.index}
          cardIndex={index}
          key={"list" + props.index+ "card"+index}
          deleteCard={props.deleteCard}
          />
        );
      });
    }
    return (<div>error: missing day</div>);
  };

  return (
    <Paper elevation={3} className={classes.DayContainer}>
      <div className={classes.DayBar}>
        <h4 className={classes.DayName}>{day.name}</h4>
        <AddFavouriteButton className={classes.AddButton} addCards={props.addCards} tripID={tripID} listIndex={props.index}/>
      </div>
      <hr/>
      <Droppable droppableId={props.index.toString()} direction="vertical" type="list">
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {mapCards()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );

});
const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  };
};
export default connect(mapStateToProps,null)(bList);
