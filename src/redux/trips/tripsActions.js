export const addTrip = input => {
  return {
    type: 'ADD_TRIP',
    title: input.tripName,
    days: input.numberOfDays
  };
};

export const deleteTrip = text => {
  return {
    type: 'DELETE_TRIP',
    title: text
  };
};
