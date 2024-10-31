export const primaryMenu = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    link: '/dashboard',
    icon: 'Chart.Assessment',
  },
  {
    key: 'property',
    name: 'Property',
    icon: 'HomePlaces.MapsHomeWork',
    showCancellationIcon: true,
    child: [
      {
        key: 'buildings',
        name: 'Buildings',
        link: '/property/buildings',
        icon: 'HomePlaces.Apartment',
      },
      {
        key: 'applications',
        name: 'Applications',
        link: '/property/applications',
        icon: 'HomePlaces.Villa',
      },
      {
        key: 'policies',
        name: 'Policies',
        link: '/property/policies',
        icon: 'Security.Policy',
      },
      {
        key: 'cancel-policies',
        name: 'Flagged Cancellations',
        link: '/property/cancel-policies',
        showCancellationIcon: true,
        icon: 'General.Flag',
      },
      {
        key: 'claims',
        name: 'Claims',
        link: '/property/claims',
        icon: 'EditorLayout.EditNote',
      },
    ],
  },
  {
    key: 'invoice',
    name: 'Invoice',
    icon: 'FileFolder.ReceiptLong',
    link: '/invoice',
  },
  {
    key: 'user',
    name: 'User',
    icon: 'Users.User',
    child: [
      {
        key: 'treeview',
        name: 'Tree View',
        link: '/user/treeview',
        icon: 'Users.User',
      },
      {
        key: 'll',
        name: 'Landlord',
        link: '/user/landlord',
        icon: 'Users.User',
      },
      {
        key: 'vp',
        name: 'Full Portfolio',
        link: '/user/full-portfolio',
        icon: 'Users.User',
      },
      {
        key: 'rm',
        name: 'Multi-Site',
        link: '/user/multi-site',
        icon: 'Users.User',
      },
      {
        key: 'pm',
        name: 'Property',
        link: '/user/property',
        icon: 'Users.User',
      },
      {
        key: 'invite-new-user',
        name: 'Invite New User',
        link: '/user/invite-new-user',
        icon: 'Users.User',
      },
    ],
  },
  {
    key: 'delegation',
    name: 'Delegation',
    icon: 'Arrow.ApprovalDelegation',
    child: [
      {
        key: 'invite',
        name: 'Invite',
        link: '/invite',
      },
      {
        key: 'request',
        name: 'Request',
        link: '/request',
      },
    ],
  },
  {
    key: 'landlord-invite',
    name: 'Landlord Invite',
    link: '/landlord-invite',
    icon: 'Users.PersonAdd',
  },
  {
    key: 'email',
    name: 'Email',
    link: '/email',
    icon: 'Notifications.Email',
  },
  {
    key: 'notification',
    name: 'Notification',
    icon: 'Notifications.Notifications',
    child: [
      {
        key: 'to',
        name: 'To',
        link: '/notification/to',
      },
      {
        key: 'from',
        name: 'From',
        link: '/notification/from',
      },
    ],
  },
  // {
  //   key: 'cancellationlog',
  //   name: 'Policy Cancel Log',
  //   icon: 'FileFolder.IntegrationInstructions',
  //   link: '/cancellation-log',
  // },
];

export const secondaryMenu = [
  {
    key: 'guide',
    name: 'Portal Guide',
    icon: 'FileFolder.CloudAssignment',
    link: '/guide',
  },
  {
    key: 'activelog',
    name: 'Activity Log',
    icon: 'FileFolder.IntegrationInstructions',
    link: '/active-log',
  },
  {
    key: 'reportissue',
    name: 'Report an issue',
    icon: 'General.BugReport',
    link: 'https://forms.gle/WkL1y9jCzsePLD4j6',
    isExternal: true,
  },
  {
    key: 'resourcecenter',
    name: 'Resource Center',
    icon: 'General.Report',
    link: 'https://www.leapeasy.com/resource',
    isExternal: true,
  },
];
