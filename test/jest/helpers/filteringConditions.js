export const initialValues = {
  'id': '6d18cafb-d498-4bb4-b69d-57d0e4a50254',
  'name': 'test set',
  'description': '',
  'setSpec': 'Loc_Ann',
  'metadata': {
    'createdDate': '2021-10-05T08:19:06.390+00:00',
    'createdByUserId': 'a0ba1f5d-cbcc-5a62-92d1-f978787332fe',
    'updatedDate': '2021-10-05T08:19:06.390+00:00',
    'updatedByUserId': 'a0ba1f5d-cbcc-5a62-92d1-f978787332fe'
  },
  'filteringConditions': [{
    'name': 'location',
    'active': true,
    'value': 'Annex',
    'setSpec': 'Loc_Ann'
  }, { 'name': 'illPolicy', 'active': false, 'setSpec': '' }, {
    'name': 'materialType',
    'active': false,
    'setSpec': ''
  }, { 'name': 'resourceType', 'active': false, 'setSpec': '' }, { 'name': 'format', 'active': false, 'setSpec': '' }]
};

export const setsFilteringConditions = [
  {
    name : 'location',
    values : ['Annex', 'Main Library', 'ORWIG ETHNO CD', 'Popular Reading Collection', 'Online', 'SECOND FLOOR']
  },
  {
    name : 'illPolicy',
    values : ['Unknown reproduction policy', 'Unknown lending policy', 'Will lend', 'Will not reproduce', 'Limited lending policy', 'Will not lend', 'Will reproduce', 'Will lend hard copy only']
  },
  {
    name : 'materialType',
    values : ['video recording', 'unspecified', 'book', 'text', 'sound recording', 'microform', 'electronic resource', 'dvd']
  },
];

export const filterOptions = {
  'location': [
    {
      'label': 'Select location',
      'value': ''
    },
    {
      'label': 'Annex',
      'value': 'Annex'
    },
    {
      'label': 'Main Library',
      'value': 'Main Library'
    },
    {
      'label': 'ORWIG ETHNO CD',
      'value': 'ORWIG ETHNO CD'
    },
    {
      'label': 'Popular Reading Collection',
      'value': 'Popular Reading Collection'
    },
    {
      'label': 'Online',
      'value': 'Online'
    },
    {
      'label': 'SECOND FLOOR',
      'value': 'SECOND FLOOR'
    }
  ],
  'illPolicy': [
    {
      'label': 'Select ILL policy',
      'value': ''
    },
    {
      'label': 'Unknown reproduction policy',
      'value': 'Unknown reproduction policy'
    },
    {
      'label': 'Unknown lending policy',
      'value': 'Unknown lending policy'
    },
    {
      'label': 'Will lend',
      'value': 'Will lend'
    },
    {
      'label': 'Will not reproduce',
      'value': 'Will not reproduce'
    },
    {
      'label': 'Limited lending policy',
      'value': 'Limited lending policy'
    },
    {
      'label': 'Will not lend',
      'value': 'Will not lend'
    },
    {
      'label': 'Will reproduce',
      'value': 'Will reproduce'
    },
    {
      'label': 'Will lend hard copy only',
      'value': 'Will lend hard copy only'
    }
  ],
  'materialType': [
    {
      'label': 'Select material type',
      'value': ''
    },
    {
      'label': 'video recording',
      'value': 'video recording'
    },
    {
      'label': 'unspecified',
      'value': 'unspecified'
    },
    {
      'label': 'book',
      'value': 'book'
    },
    {
      'label': 'text',
      'value': 'text'
    },
    {
      'label': 'sound recording',
      'value': 'sound recording'
    },
    {
      'label': 'microform',
      'value': 'microform'
    },
    {
      'label': 'electronic resource',
      'value': 'electronic resource'
    },
    {
      'label': 'dvd',
      'value': 'dvd'
    }
  ],
  'resourceType': [
    {
      'label': 'Select resource type',
      'value': ''
    },
    {
      'label': 'other',
      'value': 'other'
    },
    {
      'label': 'tactile text',
      'value': 'tactile text'
    },
    {
      'label': 'unspecified',
      'value': 'unspecified'
    },
    {
      'label': 'tactile image',
      'value': 'tactile image'
    },
    {
      'label': 'cartographic three-dimensional form',
      'value': 'cartographic three-dimensional form'
    },
    {
      'label': 'computer dataset',
      'value': 'computer dataset'
    },
    {
      'label': 'sounds',
      'value': 'sounds'
    },
    {
      'label': 'text',
      'value': 'text'
    },
    {
      'label': 'three-dimensional form',
      'value': 'three-dimensional form'
    },
    {
      'label': 'performed music',
      'value': 'performed music'
    },
    {
      'label': 'still image',
      'value': 'still image'
    },
    {
      'label': 'spoken word',
      'value': 'spoken word'
    },
    {
      'label': 'cartographic image',
      'value': 'cartographic image'
    },
    {
      'label': 'tactile notated movement',
      'value': 'tactile notated movement'
    },
    {
      'label': 'cartographic dataset',
      'value': 'cartographic dataset'
    },
    {
      'label': 'notated movement',
      'value': 'notated movement'
    },
    {
      'label': 'cartographic tactile three-dimensional form',
      'value': 'cartographic tactile three-dimensional form'
    },
    {
      'label': 'tactile three-dimensional form',
      'value': 'tactile three-dimensional form'
    },
    {
      'label': 'cartographic moving image',
      'value': 'cartographic moving image'
    },
    {
      'label': 'cartographic tactile image',
      'value': 'cartographic tactile image'
    },
    {
      'label': 'tactile notated music',
      'value': 'tactile notated music'
    },
    {
      'label': 'notated music',
      'value': 'notated music'
    },
    {
      'label': 'three-dimensional moving image',
      'value': 'three-dimensional moving image'
    },
    {
      'label': 'computer program',
      'value': 'computer program'
    },
    {
      'label': 'two-dimensional moving image',
      'value': 'two-dimensional moving image'
    }
  ],
  'format': [
    {
      'label': 'Select format',
      'value': ''
    },
    {
      'label': 'video -- other',
      'value': 'video -- other'
    },
    {
      'label': 'projected image -- film roll',
      'value': 'projected image -- film roll'
    },
    {
      'label': 'audio -- audio roll',
      'value': 'audio -- audio roll'
    },
    {
      'label': 'microform -- microfilm reel',
      'value': 'microform -- microfilm reel'
    },
    {
      'label': 'audio -- audio belt',
      'value': 'audio -- audio belt'
    },
    {
      'label': 'microform -- microfiche',
      'value': 'microform -- microfiche'
    },
    {
      'label': 'computer -- computer chip cartridge',
      'value': 'computer -- computer chip cartridge'
    },
    {
      'label': 'microform -- microopaque',
      'value': 'microform -- microopaque'
    },
    {
      'label': 'computer -- computer tape reel',
      'value': 'computer -- computer tape reel'
    },
    {
      'label': 'microform -- microfilm slip',
      'value': 'microform -- microfilm slip'
    },
    {
      'label': 'projected image -- filmslip',
      'value': 'projected image -- filmslip'
    },
    {
      'label': 'audio -- audio disc',
      'value': 'audio -- audio disc'
    },
    {
      'label': 'microscopic -- microscope slide',
      'value': 'microscopic -- microscope slide'
    },
    {
      'label': 'unmediated -- sheet',
      'value': 'unmediated -- sheet'
    },
    {
      'label': 'computer -- computer tape cartridge',
      'value': 'computer -- computer tape cartridge'
    },
    {
      'label': 'stereographic -- stereograph card',
      'value': 'stereographic -- stereograph card'
    },
    {
      'label': 'computer -- computer tape cassette',
      'value': 'computer -- computer tape cassette'
    },
    {
      'label': 'video -- videocassette',
      'value': 'video -- videocassette'
    },
    {
      'label': 'microform -- other',
      'value': 'microform -- other'
    },
    {
      'label': 'microform -- microfilm cartridge',
      'value': 'microform -- microfilm cartridge'
    },
    {
      'label': 'microscopic -- other',
      'value': 'microscopic -- other'
    },
    {
      'label': 'computer -- online resource',
      'value': 'computer -- online resource'
    },
    {
      'label': 'audio -- audio cartridge',
      'value': 'audio -- audio cartridge'
    },
    {
      'label': 'unspecified -- unspecified',
      'value': 'unspecified -- unspecified'
    },
    {
      'label': 'projected image -- film cassette',
      'value': 'projected image -- film cassette'
    },
    {
      'label': 'projected image -- filmstrip',
      'value': 'projected image -- filmstrip'
    },
    {
      'label': 'unmediated -- card',
      'value': 'unmediated -- card'
    },
    {
      'label': 'audio -- audiotape reel',
      'value': 'audio -- audiotape reel'
    },
    {
      'label': 'projected image -- film reel',
      'value': 'projected image -- film reel'
    },
    {
      'label': 'projected image -- overhead transparency',
      'value': 'projected image -- overhead transparency'
    },
    {
      'label': 'computer -- other',
      'value': 'computer -- other'
    },
    {
      'label': 'stereographic -- stereograph disc',
      'value': 'stereographic -- stereograph disc'
    },
    {
      'label': 'unmediated -- flipchart',
      'value': 'unmediated -- flipchart'
    },
    {
      'label': 'audio -- audio wire reel',
      'value': 'audio -- audio wire reel'
    },
    {
      'label': 'computer -- computer card',
      'value': 'computer -- computer card'
    },
    {
      'label': 'video -- video cartridge',
      'value': 'video -- video cartridge'
    },
    {
      'label': 'audio -- other',
      'value': 'audio -- other'
    },
    {
      'label': 'computer -- computer disc cartridge',
      'value': 'computer -- computer disc cartridge'
    },
    {
      'label': 'microform -- microfilm roll',
      'value': 'microform -- microfilm roll'
    },
    {
      'label': 'microform -- microfilm cassette',
      'value': 'microform -- microfilm cassette'
    },
    {
      'label': 'unmediated -- roll',
      'value': 'unmediated -- roll'
    },
    {
      'label': 'video -- videotape reel',
      'value': 'video -- videotape reel'
    },
    {
      'label': 'audio -- audio cylinder',
      'value': 'audio -- audio cylinder'
    },
    {
      'label': 'audio -- sound track reel',
      'value': 'audio -- sound track reel'
    },
    {
      'label': 'projected image -- slide',
      'value': 'projected image -- slide'
    },
    {
      'label': 'unmediated -- object',
      'value': 'unmediated -- object'
    },
    {
      'label': 'video -- videodisc',
      'value': 'video -- videodisc'
    },
    {
      'label': 'unmediated -- other',
      'value': 'unmediated -- other'
    },
    {
      'label': 'stereographic -- other',
      'value': 'stereographic -- other'
    },
    {
      'label': 'projected image -- other',
      'value': 'projected image -- other'
    },
    {
      'label': 'projected image -- film cartridge',
      'value': 'projected image -- film cartridge'
    },
    {
      'label': 'unmediated -- volume',
      'value': 'unmediated -- volume'
    },
    {
      'label': 'projected image -- filmstrip cartridge',
      'value': 'projected image -- filmstrip cartridge'
    },
    {
      'label': 'audio -- audiocassette',
      'value': 'audio -- audiocassette'
    },
    {
      'label': 'microform -- aperture card',
      'value': 'microform -- aperture card'
    },
    {
      'label': 'microform -- microfiche cassette',
      'value': 'microform -- microfiche cassette'
    },
    {
      'label': 'computer -- computer disc',
      'value': 'computer -- computer disc'
    }
  ]
};
