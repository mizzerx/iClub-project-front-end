const stringFormat = {
  formatDate: (date, format) => {
    const o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      S: date.getMilliseconds(), // millisecond
    };
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length),
      );
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length),
        );
      }
    }
    return format;
  },
  formatDateToString: (date, format) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = month * 12;
    const diffYear = now.getFullYear() - date.getFullYear();
    const diffMonth = diffYear * 12 + now.getMonth() - date.getMonth();
    const diffDay = diffYear * 365 + now.getDate() - date.getDate();
    const diffHour = diff / hour;
    const diffMinute = diff / minute;
    const diffSecond = diff / 1000;
    if (diffSecond < 60) {
      return 'Just now';
    }
    if (diffMinute < 60) {
      return `${Math.floor(diffMinute)} minutes ago`;
    }
    if (diffHour < 24) {
      return `${Math.floor(diffHour)} hours ago`;
    }
    if (diffDay < 30) {
      return `${Math.floor(diffDay)} days ago`;
    }
    if (diffMonth < 12) {
      return `${Math.floor(diffMonth)} months ago`;
    }
    if (diffYear < 1) {
      return `${Math.floor(diffYear)} years ago`;
    }
    return stringFormat.formatDate(date, format);
  },
};

export default stringFormat;
