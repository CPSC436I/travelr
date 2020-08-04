import React, { useState, useEffect } from "react";
import BoardCard from "./BoardCard";
import { Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AddFavouriteButton from './AddFavouriteButton';

const useStyles = makeStyles((theme) => ({
  DayContainer: {
    'background-color': '#dfe3e6',
    'border-radius': '10px',
    width: '300px',
    padding: '8px',
    height: '100%',
    margin: '0 8px 0 0',
  }
}));

const bList = React.memo(function BoardList(props) {
  const classes = useStyles();
  // const trip = props.trips.trips.find(trip => trip._id === props.tripID);
  const tripID = props.trip._id;
  const day = props.day;
  // const [cardMap, setCardMap] = useState([]);
  // const [content, setContent] = useState([]);

  // useEffect(()=>{
  //   let findTrip = props.trips.trips.find(trip => trip._id === tripID);
  //   let findDay = findTrip.days[props.index];
  //   setContent(findDay.content);
  //   // setDay(findDay);
  // },[props.trips.trips]);
  //
  // useEffect(()=>{
  //   setCardMap(mapCards());
  // },[props]);
  // const [dayContent, setDayContent] = useState([]);
  //
  // useEffect(()=>{
  //   setDayContent(mapCards());
  //   console.log(dayContent);
  // },[props]);

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
    <div className={classes.DayContainer}> {day.name}<hr/>
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
    <AddFavouriteButton addCards={props.addCards} tripID={tripID} listIndex={props.index}/>
    </div>
  );

});
const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  };
};
export default connect(mapStateToProps,null)(bList);
