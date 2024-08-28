const menuData = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    linkParent: '/dashboard',
    icon: 'ion-ios-stats',
  },
  {
    key: 'property',
    name: 'Property',
    icon: 'ion-ios-home-outline',
    showCancellationIcon: true,
    child: [
      {
        key: 'buildings',
        name: 'Buildings',
        link: '/dashboard/property/buildings',
      },
      {
        key: 'applications',
        name: 'Applications',
        link: '/dashboard/property/applications',
      },
      {
        key: 'policies',
        name: 'Policies',
        link: '/dashboard/property/policies',
      },
      {
        key: 'cancel-policies',
        name: 'Flagged Cancellations',
        link: '/dashboard/property/cancel-policies',
        showCancellationIcon: true,
      },
      {
        key: 'claims',
        name: 'Claims',
        link: '/dashboard/property/claims',
      },
    ],
  },
  {
    key: 'invoice',
    name: 'Invoice',
    icon: 'ion-ios-home-outline',
    linkParent: '/dashboard/invoice',
  },
  {
    key: 'user',
    name: 'User',
    icon: 'ion-ios-people-outline',
    child: [
      {
        key: 'treeview',
        name: 'Tree View',
        link: '/dashboard/user/treeview',
      },
      {
        key: 'll',
        name: 'Landlord',
        link: '/dashboard/user/landlord',
      },
      {
        key: 'vp',
        name: 'Full Portfolio',
        link: '/dashboard/user/full-portfolio',
      },
      {
        key: 'rm',
        name: 'Multi-Site',
        link: '/dashboard/user/multi-site',
      },
      {
        key: 'pm',
        name: 'Property',
        link: '/dashboard/user/property',
      },
    ],
  },
  {
    key: 'invite-new-user',
    name: 'Invite New User',
    icon: 'ion-ios-person-add-outline',
    linkParent: '/dashboard/invite-user',
  },
  {
    key: 'delegation',
    name: 'Delegation',
    icon: 'ion-ios-person-add-outline',
    child: [
      {
        key: 'invite',
        name: 'Invite',
        link: '/dashboard/invite',
      },
      {
        key: 'request',
        name: 'Request',
        link: '/dashboard/request',
      },
    ],
  },
  {
    key: 'landlord-invite',
    name: 'Landlord Invite',
    linkParent: '/dashboard/landlord-invite',
    icon: 'ion-ios-person-add-outline',
  },
  {
    key: 'email',
    name: 'Email',
    linkParent: '/dashboard/email',
    icon: 'ion-ios-mail-outline',
  },
  {
    key: 'notification',
    name: 'Notification',
    icon: 'ion-ios-notifications-outline',
    child: [
      {
        key: 'to',
        name: 'To',
        link: '/dashboard/notification/to',
      },
      {
        key: 'from',
        name: 'From',
        link: '/dashboard/notification/from',
      },
    ],
  },
  {
    key: 'guide',
    name: 'Guide',
    icon: 'ion-ios-help-circle-outline',
    linkParent: '/dashboard/guide',
  },
  {
    key: 'cancellationlog',
    name: 'Policy Cancel Log',
    icon: 'ion-ios-pulse-outline',
    linkParent: '/dashboard/cancellation-log',
  },
  {
    key: 'activelog',
    name: 'Active Log',
    icon: 'ion-ios-pulse-outline',
    linkParent: '/dashboard/active-log',
  },
  {
    key: 'resourcecenter',
    name: 'Resource Center',
    icon: 'ion-ios-information-circle-outline',
    linkParent: 'https://www.leapeasy.com/resource',
    isExternal: true
  }
];

export default menuData;
