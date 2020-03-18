export interface Image {
  type: 'video' | 'image';
  reference: string;
  placeHolderImage?: string;
  caption?: string;
  [metaData: string]: string;
}

export interface EventData {
  propertyId: string;
  id: string;
  name: string;
  contentType: 'show';
  description: string;
  images: {
    unifiedGallery?: Image[];
    overview: string;
  };
  priceRange?: '$' | '$$' | '$$$' | '$$$$' | '$$$$$';
  showTimesDescriptions?: Array<{ description: string; time: string }>;
  startingPrice?: number | string;
  boxOfficeHours?: Array<{ description: string; time: string }>;
  relatedEvents?: string[];
  seasons?: Array<{
    displayName: string;
    periodStartDate: string;
    periodEndDate: string;
    id: string;
  }>;
}

export const events: EventData[] = [
  {
    propertyId: '66964e2b-2550-4476-84c3-1a4c0c5c067f',
    id: 'ka-by-cirque-du-soleil',
    name: 'KÀ by Cirque du Soleil ',
    description:
      'A masterpiece in storytelling, KÀ tells the epic tale of twins on a journey to fulfill their shared destiny.',
    images: {
      unifiedGallery: [
        {
          type: 'video',
          caption: 'KÀ by Cirque du Soleil',
          hlsMultirateStreamURL:
            'https://mgm.scene7.com/is/content/MGM/mgm-grand-entertainment-ka-in-market-video-720-30-sec-AVS.m3u8',
          placeHolderImage:
            '/content/dam/MGM/mgm-grand/entertainment/shows/ka-by-cirque-du-soleil/lifestyle/mgm-grand-entertainment-ka-characters-man-and-woman.tif',
          reference: 'http://s7d2.scene7.com/is/image/MGM/mgm-grand-entertainment-ka-in-market-video-720-30-sec-AVS',
        },
        {
          type: 'image',
          reference:
            '/content/dam/MGM/mgm-grand/entertainment/shows/ka-by-cirque-du-soleil/architectures/mgm-grand-entertainment-ka-interior-stage-pillars-vertical-@2x.jpg',
        },
        {
          type: 'image',
          reference:
            '/content/dam/MGM/mgm-grand/entertainment/shows/ka-by-cirque-du-soleil/lifestyle/mgm-grand-entertainment-ka-characters-twin-brother-boy-vertical-@2x.jpg',
        },
        {
          type: 'image',
          reference:
            '/content/dam/MGM/mgm-grand/entertainment/shows/ka-by-cirque-du-soleil/lifestyle/mgm-grand-entertainment-ka-jester@2x.jpg',
        },
        {
          type: 'image',
          reference:
            '/content/dam/MGM/mgm-grand/entertainment/shows/ka-by-cirque-du-soleil/lifestyle/mgm-grand-entertainment-ka-characters-man-and-woman.tif',
        },
      ],
      overview:
        '/content/dam/MGM/mgm-grand/entertainment/shows/ka-by-cirque-du-soleil/campaign/mgm-grand-entertainment-ka-2015-brand-creative.jpg',
    },
    priceRange: '$$',
    showTimesDescriptions: [{ description: 'Cancellation Notice', time: 'Upcoming performances have been cancelled.' }],
    startingPrice: '69',
    boxOfficeHours: [
      { description: 'Saturday - Wednesday', time: '10:00 AM - 10:00 PM' },
      { description: 'Thursday - Friday', time: '10:00 AM - 5:00 PM' },
    ],
    seasons: [
      {
        displayName: 'KA by Cirque du Soleil 2017',
        periodStartDate: '2017-01-01T00:00:00-08:00',
        periodEndDate: '2018-01-01T00:00:00-08:00',
        id: '99891a92-ccbf-41ee-81e0-fa0acdc4e8c8',
      },
      {
        displayName: 'KA by Cirque du Soleil 2018',
        periodStartDate: '2018-01-01T00:00:00-08:00',
        periodEndDate: '2019-01-01T00:00:00-08:00',
        id: 'bf1d239a-d94c-4d84-b82b-bf61e207b604',
      },
      {
        displayName: 'KA 2019',
        periodStartDate: '2018-09-03T00:00:00-07:00',
        periodEndDate: '2019-12-31T00:00:00-08:00',
        id: '14aec24e-4276-40b1-839f-7b95616dabb5',
      },
      {
        displayName: 'KA 2020',
        periodStartDate: '2020-01-01T00:00:00-08:00',
        periodEndDate: '2020-12-31T00:00:00-08:00',
        id: 'e3adc453-1e3d-4859-bd17-9ecdbc50991e',
      },
      {
        displayName: 'KA 2020 II',
        periodStartDate: '2019-12-16T00:00:00-08:00',
        periodEndDate: '2021-01-01T00:00:00-08:00',
        id: 'c5adf915-9e48-45cf-be57-9e404ccda991',
      },
    ],
    contentType: 'show',
  },
  {
    propertyId: 'mgmresorts',
    id: 'cirque-du-soleil-vip-packages',
    name: 'Cirque du Soleil VIP Packages',
    description:
      'Cirque du Soleil productions have everything from music to illusion and from acrobatics to artistry. You will never look at entertainment the same.',
    images: {
      overview:
        '/content/dam/MGM/bellagio/entertainment/shows/o-by-cirque-du-soleil/bellagio-entertainment-shows-o-by-cirque-du-soleil-vip-suites-small.jpg',
    },
    contentType: 'show',
  },
  {
    propertyId: '66964e2b-2550-4476-84c3-1a4c0c5c067f',
    id: 'kat-kevin-james',
    name: 'Kevin James',
    description:
      'Actor, executive producer and Emmy-nominated comedian Kevin James will bring his new comedy tour to MGM Grand Hotel.',
    images: {
      overview:
        '/content/dam/MGM/mgm-grand/entertainment/shows/kevin-james/mgm-grand-entertainment-ka-theater-kevin-james.jpg',
    },

    showTimesDescriptions: [{ description: 'Friday, May 29, 2020', time: '9:00 PM' }],
    startingPrice: '49.99',
    seasons: [
      {
        displayName: 'KAA Kevin James',
        periodStartDate: '2020-02-27T00:00:00-08:00',
        periodEndDate: '2020-05-30T00:00:00-07:00',
        id: '120597de-cd96-4f4b-b4c7-0812226ef481',
      },
    ],
    contentType: 'show',
  },
  {
    propertyId: '66964e2b-2550-4476-84c3-1a4c0c5c067f',
    id: 'david-copperfield',
    name: 'David Copperfield',
    description:
      'Hailed as the "greatest illusionist of our time," join David Copperfield for an intimate evening of grand illusion.',
    images: {
      overview:
        '/content/dam/MGM/mgm-grand/entertainment/shows/david-copperfield/lifestyle/mgm-grand-entertainment-david-copperfield-head-shot-no-white-space.jpg',
    },
    priceRange: '$$',
    showTimesDescriptions: [
      { description: 'Sunday - Saturday', time: '7:00 pm & 9:30 pm' },
      { description: 'Saturday Matinee', time: '4:00 pm' },
      { description: 'March 15, 2020, 9:30 pm', time: 'Cancelled' },
    ],
    startingPrice: '71.37',
    seasons: [
      {
        displayName: 'David Copperfield 2017',
        periodStartDate: '2017-01-01T00:00:00-08:00',
        periodEndDate: '2018-01-01T00:00:00-08:00',
        id: 'e44a1fe9-3a42-4165-a194-4212a74adf08',
      },
      {
        displayName: 'David Copperfield 2018',
        periodStartDate: '2018-01-01T00:00:00-08:00',
        periodEndDate: '2019-01-01T00:00:00-08:00',
        id: '27ba72c0-60d8-4674-9466-ae6bd3dd4a51',
      },
      {
        displayName: 'David Copperfield 2019',
        periodStartDate: '2019-01-01T00:00:00-08:00',
        periodEndDate: '2019-12-31T00:00:00-08:00',
        id: '0c3bf6b8-48c1-408c-8c59-d71adcd34bd5',
      },
      {
        displayName: 'David Copperfield 2020',
        periodStartDate: '2020-01-01T00:00:00-08:00',
        periodEndDate: '2020-12-31T00:00:00-08:00',
        id: 'b9699319-bb87-437e-bbe2-b06f007be9cc',
      },
    ],
    contentType: 'show',
  },
  {
    propertyId: '1f3ed672-3f8f-44d8-9215-81da3c845d83',
    id: 'mgm-resorts-entertainment',
    name: 'Entertainment',
    description: "As your gateway, The Signature puts you at the doorstep of Las Vegas' most amazing experiences.",
    images: {
      overview:
        '/content/dam/MGM/mgm-grand/entertainment/venues/grand-garden-arena/architecture/mgm-grand-entertainment-grand-garden-arena-lifestyle-audience-cheering.jpg',
    },
    priceRange: '$',
    startingPrice: '56',
    contentType: 'show',
  },
  {
    propertyId: '66964e2b-2550-4476-84c3-1a4c0c5c067f',
    id: 'brad-garretts-comedy-club',
    name: "Brad Garrett's Comedy Club",
    description:
      'Please be advised that the Brad Garrett Comedy Club performances scheduled for March 14, 2020 through April 30, 2020 at MGM Grand have been canceled. ',
    images: {
      unifiedGallery: [
        {
          type: 'video',
          hlsMultirateStreamURL:
            'https://mgm.scene7.com/is/content/MGM/mgm-grand-entertainment-brad-garrett-comedy-club-promo-video-AVS.m3u8',
          placeHolderImage:
            '/content/dam/MGM/mgm-grand/entertainment/shows/brad-garretts-comedy-club/architectures/mgm-grand-entertainment-shows-brad-garrett-comedy-club-sign.jpg',
          reference:
            'http://s7d2.scene7.com/is/image/MGM/mgm-grand-entertainment-brad-garrett-comedy-club-promo-video-AVS',
        },
        {
          type: 'image',
          caption: "A close up of the Brad Garrett's Comedy Club Sign.",
          reference:
            '/content/dam/MGM/mgm-grand/entertainment/shows/brad-garretts-comedy-club/architectures/mgm-grand-entertainment-shows-brad-garrett-comedy-club-sign.jpg',
        },
        {
          type: 'image',
          caption: "Brad Garrett's Comedy Club Interior tables",
          reference:
            '/content/dam/MGM/mgm-grand/entertainment/shows/brad-garretts-comedy-club/architectures/mgm-grand-entertainment-shows-brad-garrett-comedy-club-interior-tables-@2x.jpg',
        },
        {
          type: 'image',
          caption: "Brad Garrett's Comedy Club Interior Waitresses",
          reference:
            '/content/dam/MGM/mgm-grand/entertainment/shows/brad-garretts-comedy-club/lifestyle/mgm-grand-entertainment-shows-brad-garrett-comedy-club-interior-waitress-@2x.jpg',
        },
        {
          type: 'image',
          caption: "Brad Garrett's Comedy Club Interior booths",
          reference:
            '/content/dam/MGM/mgm-grand/entertainment/shows/brad-garretts-comedy-club/architectures/mgm-grand-entertainment-shows-brad-garrett-comedy-club-interior-booth-@2x.jpg',
        },
      ],
      overview:
        '/content/dam/MGM/mgm-grand/entertainment/shows/brad-garretts-comedy-club/architectures/mgm-grand-entertainment-shows-brad-garrett-comedy-club-exterior-@2x.jpg',
    },
    priceRange: '$$',
    showTimesDescriptions: [{ description: 'Temporarily Closed', time: 'March 14, 2020 through April 30, 2020' }],
    startingPrice: '39.45',
    boxOfficeHours: [
      { description: 'Tuesday', time: '5:00 PM - 8:30 PM' },
      { description: 'Wednesday - Monday', time: '5:00 PM - 10:00 PM' },
    ],
    seasons: [
      {
        displayName: 'Brad Garretts Comedy Club 2017',
        periodStartDate: '2017-01-01T00:00:00-08:00',
        periodEndDate: '2018-01-01T00:00:00-08:00',
        id: '9cc990e0-a463-43f6-8a1d-01d673b778ca',
      },
      {
        displayName: 'Brad Garretts Comedy Club 2018',
        periodStartDate: '2018-01-01T00:00:00-08:00',
        periodEndDate: '2019-01-01T00:00:00-08:00',
        id: 'f9d6be6f-96cd-42c6-9d9f-98b978c607c7',
      },
      {
        displayName: 'Brad Garretts Comedy Club 2019',
        periodStartDate: '2019-01-01T00:00:00-08:00',
        periodEndDate: '2019-12-31T00:00:00-08:00',
        id: '2e1256fe-5e6c-4349-a9c5-e93683ec74bd',
      },
      {
        displayName: 'Brad Garretts Comedy Club 2020',
        periodStartDate: '2020-01-01T00:00:00-08:00',
        periodEndDate: '2020-12-31T00:00:00-08:00',
        id: '8b81ab2d-f459-45b0-8f8c-11763275b03f',
      },
    ],
    contentType: 'show',
  },
  {
    propertyId: 'mgmresorts',
    id: 'new-years-eve-in-las-vegas',
    name: "New Year's Eve in Las Vegas",
    description:
      'Thank you for celebrating with MGM Resorts as we toasted to 2020. To see what entertainment is in store for 2020, visit our Entertainment page.',
    images: {
      overview: '/content/dam/MGM/corporate/getty-images/mgm-corporate-getty-nightlife.tif',
    },
    priceRange: '$',
    contentType: 'show',
  },
];

export const loadEvents = (auth = false) => (auth ? events : events.filter(event => event.propertyId !== 'mgmresorts'));
