export const getRole = (value) => {
  const role =
    value === 'll'
      ? 'Landlord'
      : value === 'vp'
        ? 'Full Portfolio'
        : value === 'rm'
          ? 'Multi-Site'
          : 'Property';
  return role;
};

export const getDemoData = (type) => {
  switch (type) {
    case 'rider-id':
      return 'LEAP-1111111';
    case 'building-name':
      return 'The Empire State Building';
    case 'landlord-name':
      return 'The White House';
    case 'tenant-name':
      return 'Jane Doe';
    case 'username':
      return 'janedoe';
    case 'primary-contact':
      return 'Test Lead';
    case 'invoice-number':
      return '12345';
    case 'invoice-description':
      return 'Jane --Leap-1111111';
    case 'address-street':
      return '20 W 34th';
    case 'address-state':
      return 'New York';
    case 'address-city':
      return 'New York';
    case 'address-country':
      return 'USA';
    case 'address-postcode':
      return '12345';
    case 'address':
      return '20 W 34th St., New York, NY 10001';
    case 'phone':
      return '(555) 555-5555';
    case 'email':
      return 'PurpleJumpingGuy@Leap.com';
    case 'account-name':
      return 'Doe - 20 W 34th';
  }

  return '';
};

let ws;
let userId;

export const WSConnect = {
  open: (user, handleMessage, handleUserListUpdate) => {
    ws = new WebSocket('wss://landlordportal.leapeasyapi.com');
    // ws = new WebSocket('ws://localhost:8000');
    userId = user['id'];
    ws.onopen = () => {
      console.log('Connection opened!');
      ws.send(JSON.stringify({ status: 'open', value: userId }));
    };
    ws.onmessage = (message) => {
      console.log(message);
      const value = JSON.parse(message.data);
      if (value.status === 'update') {
        handleUserListUpdate();
      } else {
        handleMessage();
      }
    };
  },
  close: (user) => {
    userId = user ? user['id'] : userId;
    ws.send(JSON.stringify({ status: 'close', value: userId }));
    ws.close();
  },
};
