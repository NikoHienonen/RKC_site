export default function DateConvert(dateString) {
  const getDay = day => {
    switch(day) {
      case 0: return 'Ma';
      case 1: return 'Ti';
      case 2: return 'Ke';
      case 3: return 'To';
      case 4: return 'Pe';
      case 5: return 'La';
      case 6: return 'Su';   
      default: return '';
    }
  }
  const date = new Date(dateString);
  return `${getDay(date.getDay())}, ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`; 
}