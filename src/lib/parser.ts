export function parseWhatsAppChat(text: string) {
  // Basic implementation to parse WhatsApp chat text
  const messages = text.split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => ({ text: line }));
  
  return messages;
} 