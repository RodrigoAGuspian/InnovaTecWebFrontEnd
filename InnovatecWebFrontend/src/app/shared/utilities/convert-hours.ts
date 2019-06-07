export class ConvertHours {
  public static toConver24(time12) {
    const time = time12;
    const date = new Date();
    let h = Number(time.substr(0, 2));
    const m = Number(time.substr(3, 2));
    const mD = time.substr(6, 2);
    if (time.substr(6, 2) === 'PM' && h !== 12) {
      h += 12;
    } else {
      if (time.substr(6, 2) === 'AM' && h === 12) {
        h += 12;
      }
    }
    date.setHours(h , m);
    return date;

  }
}
