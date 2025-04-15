import { format, parseISO } from 'date-fns';

// format date string to a readable format
export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), 'MMMM dd, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

// create an excerpt

export function createExcerpt(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  
  // try to find a space to cut at to avoid cutting a word in half
  const cutoff = text.lastIndexOf(' ', maxLength);
  return cutoff > 0 ? `${text.substring(0, cutoff)}...` : `${text.substring(0, maxLength)}...`;
}

 // generate the current ISO date string for new posts
export function getCurrentISODate(): string {
  return new Date().toISOString();
}