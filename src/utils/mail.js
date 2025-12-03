export function getMailProviderUrl(email) {
    console.log('getMailProvrider: email -> ', email);
    
  const domain = email.split('@')[1];

  if (!domain) return null;

  if (domain.includes('gmail')) return 'https://mail.google.com';
  if (domain.includes('outlook') || domain.includes('hotmail') || domain.includes('live'))
    return 'https://outlook.live.com';
  if (domain.includes('yahoo')) return 'https://mail.yahoo.com';

  return null;
}
