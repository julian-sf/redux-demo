import gql from 'graphql-tag';

export const EVENTS_QUERY = gql`
  query events {
    events @rest(type: "events", path: "events") {
      id
      name
      propertyId
      relatedEvents
      contentType
      description
      images
      priceRange
      showTimesDescriptions
      startingPrice
      boxOfficeHours
      relatedEvents
      seasons
    }
  }
`;
