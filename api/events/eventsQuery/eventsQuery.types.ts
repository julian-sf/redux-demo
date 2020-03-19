export type EventType = {
  id: string;
  name: string;
  propertyId: string;
  relatedEvents: string[];
};

export type EventsResponse = {
  events: EventType[];
};
