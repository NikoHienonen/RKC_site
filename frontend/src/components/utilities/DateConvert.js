export default function DateConvert(dateString) {
  const getDay = day => {
    switch(day) {
      case 1: return 'Ma';
      case 2: return 'Ti';
      case 3: return 'Ke';
      case 4: return 'To';
      case 5: return 'Pe';
      case 6: return 'La';
      case 7: return 'Su';   
      default: return '';
    }
  }
  const january = month => month === 0 ? 1 : month;
  const  minutes = minutes => minutes === 0 ? '00' : minutes;
  const date = new Date(dateString);
  return `${getDay(date.getDay())}, ${date.getDate()}/${january(date.getMonth())}/${date.getFullYear()} ${date.getHours()}:${minutes(date.getMinutes())}`; 
}